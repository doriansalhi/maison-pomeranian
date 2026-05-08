import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { createServiceRoleSupabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Erreur signature webhook:', err);
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ['data.price.product'] }
      );

      const shippingAddress = session.shipping_details?.address ?? null;
      const supabase = createServiceRoleSupabase();

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: session.metadata?.userId ?? null,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          customer_email: session.customer_email ?? session.customer_details?.email ?? '',
          customer_name: session.customer_details?.name ?? null,
          amount_total: session.amount_total ?? 0,
          amount_subtotal: session.amount_subtotal ?? 0,
          amount_shipping: session.shipping_cost?.amount_total ?? 0,
          currency: session.currency ?? 'eur',
          shipping_address: shippingAddress,
          status: 'paid',
          payment_status: session.payment_status,
          paid_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (orderError) {
        console.error('Erreur creation commande:', orderError);
        return NextResponse.json({ error: orderError.message }, { status: 500 });
      }

      const itemsToInsert = lineItems.data.map((item) => {
        const product = item.price?.product as Stripe.Product;
        return {
          order_id: order.id,
          product_id: product.metadata?.productId ?? product.id,
          product_slug: product.metadata?.productSlug ?? '',
          product_name: item.description ?? product.name,
          product_image: product.images?.[0] ?? null,
          selected_color: product.metadata?.selectedColor ?? null,
          quantity: item.quantity ?? 1,
          unit_price: item.price?.unit_amount ?? 0,
          total_price: item.amount_total ?? 0,
        };
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert);

      if (itemsError) {
        console.error('Erreur creation lignes:', itemsError);
        return NextResponse.json({ error: itemsError.message }, { status: 500 });
      }

      await resend.emails.send({
        from: 'Maison Pomeranian <commandes@maison-pomeranian.com>',
        to: order.customer_email,
        subject: `Confirmation de votre commande N° ${order.id.slice(0, 8).toUpperCase()}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #3D2817;">
            <h1 style="font-size: 28px; font-weight: normal; margin-bottom: 8px;">Maison Pomeranian</h1>
            <p style="color: #B88080; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 40px;">Saint-Tropez</p>
            <h2 style="font-size: 22px; font-weight: normal; margin-bottom: 16px;">Votre commande est confirmee</h2>
            <p style="color: #6B5744; line-height: 1.6;">Merci ${order.customer_name ?? 'cher membre'}, votre commande a bien ete recue et sera expediee sous 24 a 48h.</p>
            <div style="background: #FFF9F5; border: 1px solid #EDE0D8; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #B88080; text-transform: uppercase; letter-spacing: 0.1em;">Numero de commande</p>
              <p style="margin: 0; font-size: 20px;">N° ${order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div style="margin: 32px 0;">
              <p style="font-size: 12px; color: #B88080; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Articles commandes</p>
              ${itemsToInsert.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #EDE0D8;">
                  <span>${item.product_name} x ${item.quantity}</span>
                  <span>${(item.total_price / 100).toFixed(2)} EUR</span>
                </div>
              `).join('')}
              <div style="display: flex; justify-content: space-between; padding: 16px 0; font-size: 18px;">
                <span>Total</span>
                <span>${(order.amount_total / 100).toFixed(2)} EUR</span>
              </div>
            </div>
            <p style="color: #6B5744; line-height: 1.6;">Suivez votre commande depuis <a href="https://maison-pomeranian.com/le-cercle/commandes" style="color: #B88080;">Le Cercle</a>.</p>
            <p style="margin-top: 40px; color: #6B5744;">Avec tendresse,<br><em>Maison Pomeranian</em></p>
          </div>
        `,
      });

    } catch (err) {
      console.error('Erreur webhook:', err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Erreur inconnue' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
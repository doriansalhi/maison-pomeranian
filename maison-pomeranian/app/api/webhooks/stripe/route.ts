import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceRoleSupabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
    console.error('🔴 Erreur signature webhook:', err);
    return NextResponse.json(
      { error: 'Signature invalide' },
      { status: 400 }
    );
  }

  console.log('🟢 Webhook reçu:', event.type);

  // ─── Paiement réussi ────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Récupère les line items (les produits commandés) depuis Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ['data.price.product'] }
      );

      // Récupère l'adresse de livraison
      const shippingAddress = session.shipping_details?.address ?? null;

      // Connexion Supabase avec service role (droits complets)
      const supabase = createServiceRoleSupabase();

      // 1. Créer la commande
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
        console.error('🔴 Erreur création commande:', orderError);
        return NextResponse.json({ error: orderError.message }, { status: 500 });
      }

      console.log('🟢 Commande créée:', order.id);

      // 2. Créer les lignes de commande
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
        console.error('🔴 Erreur création lignes:', itemsError);
        return NextResponse.json({ error: itemsError.message }, { status: 500 });
      }

      console.log('🟢 Lignes créées:', itemsToInsert.length);
    } catch (err) {
      console.error('🔴 Erreur webhook:', err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Erreur inconnue' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
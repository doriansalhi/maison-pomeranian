import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import type {
  CheckoutRequestBody,
  CheckoutResponse,
  CheckoutErrorResponse,
} from '@/types';

export async function POST(
  req: NextRequest
): Promise<NextResponse<CheckoutResponse | CheckoutErrorResponse>> {
  try {
    const { userId } = await auth();
    const body = (await req.json()) as CheckoutRequestBody;
    const { items } = body;

    // ── Validation ─────────────────────────────────────────────
    if (!items?.length) {
      return NextResponse.json(
        { error: 'Le panier est vide.' },
        { status: 400 }
      );
    }

    for (const item of items) {
      if (!item.id || !item.name || typeof item.price !== 'number') {
        return NextResponse.json(
          { error: 'Article invalide dans le panier.' },
          { status: 400 }
        );
      }
      if (item.quantity < 1 || item.quantity > 99) {
        return NextResponse.json(
          { error: `Quantité invalide pour ${item.name}.` },
          { status: 400 }
        );
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;

    // ── Création de la session Stripe ──────────────────────────
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      locale: 'fr',

      line_items: items.map((item) => {
        if (item.stripePriceId) {
          return {
            price: item.stripePriceId,
            quantity: item.quantity,
          };
        }
        return {
          price_data: {
            currency: 'eur',
            unit_amount: item.price,
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : undefined,
              metadata: {
                productId: item.id,
                productSlug: item.slug,
                selectedColor: item.selectedColor ?? '',
              },
            },
          },
          quantity: item.quantity,
        };
      }),

      shipping_address_collection: {
        allowed_countries: [
          'FR', 'BE', 'LU', 'CH', 'MC',
          'IT', 'ES', 'DE', 'NL', 'GB', 'IE', 'PT',
        ],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Expédition Riviera offerte (48h)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'eur' },
            display_name: 'Express signature (24h)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 1 },
            },
          },
        },
      ],

      automatic_tax: { enabled: false },
      allow_promotion_codes: true,

      success_url: `${baseUrl}/commande/confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?cart=open`,

      client_reference_id: userId ?? undefined,
      customer_email: undefined, // Stripe demandera l'email
      metadata: {
        userId: userId ?? 'guest',
        source: 'maison-pomeranian-web',
      },
    });

    return NextResponse.json({
      url: session.url,
      id: session.id,
    });
  } catch (err) {
    console.error('[/api/checkout]', err);
    const message = err instanceof Error ? err.message : 'Erreur serveur';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
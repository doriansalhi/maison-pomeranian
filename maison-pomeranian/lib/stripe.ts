import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY est manquant dans les variables d\'environnement');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
  appInfo: {
    name: 'Maison Pomeranian',
    version: '0.1.0',
    url: 'https://maison-pomeranian.com',
  },
});

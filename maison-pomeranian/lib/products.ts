import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/products';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: 'Produit introuvable' };

  const url = `https://maison-pomeranian.com/products/${slug}`;

  return {
    title: `${product.name} — Accessoire & Soin Pomeranian | Maison Pomeranian`,
    description: product.description ?? `Découvrez ${product.name}, accessoire ou soin pour Pomeranian et Spitz nain. Conçu avec amour à Saint-Tropez.`,
    keywords: ['soins Pomeranian', 'accessoires Pomeranian', 'soins Spitz nain', product.name],
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} — Maison Pomeranian`,
      description: product.description ?? '',
      url,
      siteName: 'Maison Pomeranian',
      locale: 'fr_FR',
      type: 'website',
      images: product.images?.[0] ? [{ url: product.images[0], width: 1200, height: 630, alt: product.name }] : [],
    },
  };
}
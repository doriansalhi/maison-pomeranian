// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { COLLECTIONS } from '@/lib/collections';
import { getProductsByCollection } from '@/lib/products';
import type { CollectionSlug } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return { title: 'Collection introuvable' };

  const url = `https://maison-pomeranian.com/collections/${slug}`;

  return {
    title: `${collection.name} | Maison Pomeranian`,
    description: collection.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${collection.name} — Maison Pomeranian`,
      description: collection.description,
      url,
      siteName: 'Maison Pomeranian',
      locale: 'fr_FR',
      type: 'website',
      images: [{
        url: `https://maison-pomeranian.com/api/og?type=collection&title=${encodeURIComponent(collection.name)}&subtitle=${encodeURIComponent(collection.description?.slice(0, 80) ?? '')}`,
        width: 1200,
        height: 630,
        alt: `${collection.name} — accessoires Pomeranian`,
      }],
    },
  };
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) notFound();

  const products = getProductsByCollection(slug as CollectionSlug);
  const url = `https://maison-pomeranian.com/collections/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${collection.name} — Maison Pomeranian`,
    description: collection.description,
    url,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Maison Pomeranian',
      url: 'https://maison-pomeranian.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://maison-pomeranian.com' },
        { '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://maison-pomeranian.com/collections' },
        { '@type': 'ListItem', position: 3, name: collection.name, item: url },
      ],
    },
    ...(products.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: products.length,
        itemListElement: products.map((product, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            description: product.description ?? undefined,
            url: `https://maison-pomeranian.com/produits/${product.slug ?? product.id}`,
            image: product.image ?? undefined,
            brand: { '@type': 'Brand', name: 'Maison Pomeranian' },
            ...(product.price && {
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `https://maison-pomeranian.com/produits/${product.slug ?? product.id}`,
              },
            }),
          },
        })),
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24 relative overflow-hidden">
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <nav
              aria-label="Fil d'Ariane"
              className="flex items-center gap-2 soft-label text-terre/50 mb-10 text-[0.65rem]"
            >
              <Link href="/" className="transition-all duration-500 ease-in-out hover:text-orose-500">
                Accueil
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/collections" className="transition-all duration-500 ease-in-out hover:text-orose-500">
                Collections
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-orose-500" aria-current="page">{collection.name}</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">{collection.tagline}</span>
              </div>
              <h1 className="font-serif text-4xl lg:text-6xl text-terre leading-[1.05] text-balance">
                {collection.name}
              </h1>
              <p className="mt-4 text-terre/60 max-w-2xl leading-relaxed">
                {collection.description}
              </p>
            </div>
          </ScrollReveal>

          {products.length > 0 ? (
            <ScrollReveal>
              <section aria-labelledby="pieces-collection">
                <div className="flex items-end justify-between mb-10">
                  <h2
                    id="pieces-collection"
                    className="font-serif text-3xl lg:text-4xl text-terre"
                  >
                    Les pièces de la collection
                  </h2>
                  <span className="soft-label text-terre/50">
                    {products.length} pièce{products.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} priority={i < 3} />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="bg-pur rounded-cloud p-16 lg:p-24 text-center border-soft shadow-soft">
                <h2 className="font-serif text-3xl text-terre italic mb-4">
                  Bientôt disponible
                </h2>
                <p className="text-terre/60 max-w-md mx-auto leading-relaxed">
                  Les pièces de cette collection arrivent très bientôt.
                  Inscrivez-vous au Cercle pour être prévenu(e) en avant-première.
                </p>
                <Link
                  href="/le-cercle"
                  className="inline-block mt-8 px-6 py-3 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
                >
                  <span className="soft-label">Rejoindre Le Cercle</span>
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
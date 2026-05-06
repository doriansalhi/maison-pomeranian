import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { COLLECTIONS } from '@/lib/collections';

export const metadata = {
  title: 'Collections — Accessoires & Soins Pomeranian | Maison Pomeranian',
  description:
    'Découvrez nos collections d\'accessoires et soins pour Pomeranian. Produits pensés pour le Spitz nain : soins cosmétiques, accessoires tendresse, fabriqués avec amour à Saint-Tropez.',
  openGraph: {
    title: 'Collections Accessoires & Soins Pomeranian — Maison Pomeranian',
    description:
      'Découvrez nos collections d\'accessoires et soins pour Pomeranian. Produits pensés pour le Spitz nain, fabriqués avec amour à Saint-Tropez.',
    type: 'website',
    images: [
      {
        url: 'https://maison-pomeranian.com/og-collections.jpg',
        width: 1200,
        height: 630,
        alt: 'Collections Accessoires et Soins Pomeranian — Maison Pomeranian',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections Accessoires & Soins Pomeranian — Maison Pomeranian',
    description:
      'Accessoires et soins cosmétiques pour Pomeranian. Pensés pour le Spitz nain, fabriqués avec amour.',
  },
  keywords: [
    'accessoires Pomeranian',
    'soins Pomeranian',
    'soins cosmétiques Spitz nain',
    'accessoires Spitz nain',
    'produits Pomeranian',
    'boutique Pomeranian France',
    'soins pelage Pomeranian',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Collections Accessoires & Soins Pomeranian',
  description:
    'Accessoires et soins cosmétiques pour Pomeranian, pensés pour le Spitz nain.',
  url: 'https://maison-pomeranian.com/collections',
  provider: {
    '@type': 'Organization',
    name: 'Maison Pomeranian',
    url: 'https://maison-pomeranian.com',
  },
};

export default function CollectionsPage() {
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
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">
                  Nos Collections
                </span>
                <span className="h-px w-12 bg-orose-400" />
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl text-terre leading-[1.05] text-balance">
                Deux univers,{' '}
                <em className="text-orose-500 not-italic font-light italic">
                  un seul amour.
                </em>
              </h1>
              <p className="mt-8 text-terre/70 leading-relaxed text-lg">
                Chaque collection est pensée pour accompagner votre <strong>Loulou</strong> dans un moment précis de sa vie tropézienne. Des <strong>accessoires Pomeranian</strong> et des <strong>soins cosmétiques pour Spitz nain</strong> — des matières naturelles, un savoir-faire français, et toujours beaucoup de tendresse.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {COLLECTIONS.map((collection, i) => (
              <ScrollReveal key={collection.slug} delay={i * 0.1} y={32}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block bg-pur rounded-cloud overflow-hidden transition-all duration-500 ease-in-out hover:shadow-warm hover:-translate-y-1 border-soft border-soft-hover"
                >
                  <div className="aspect-[4/3] relative bg-gradient-sunset overflow-hidden">
                    {collection.image ? (
                      <Image
                        src={collection.image}
                        alt={`${collection.name} — Accessoires et soins Pomeranian`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl transition-all duration-500 ease-in-out group-hover:scale-110">
                          {collection.icon}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 bg-pur/90 backdrop-blur-sm rounded-pill px-3 py-1 soft-label text-orose-500 text-[0.6rem] shadow-soft z-10">
                      {collection.spec}
                    </div>
                  </div>

                  <div className="p-10 lg:p-12">
                    <div className="soft-label text-orose-500 mb-3">
                      {collection.tagline}
                    </div>
                    <h2 className="font-serif text-3xl lg:text-4xl text-terre mb-5 transition-all duration-500 ease-in-out group-hover:text-orose-500">
                      {collection.name}
                    </h2>
                    <p className="text-terre/70 leading-relaxed mb-8">
                      {collection.description}
                    </p>
                    <div className="inline-flex items-center gap-2 soft-label text-terre transition-all duration-500 ease-in-out group-hover:text-orose-500">
                      <span>Découvrir la collection</span>
                      <span className="transition-all duration-500 ease-in-out group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
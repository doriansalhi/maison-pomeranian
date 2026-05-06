import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CollectionsGrid from '@/components/CollectionsGrid';
import ExpertiseSection from '@/components/ExpertiseSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata = {
  title: 'Maison Pomeranian — Accessoires & Soins Pomeranian | Saint-Tropez',
  description:
    'Boutique spécialisée accessoires et soins Pomeranian. Collections exclusives pour Spitz nain, conçues avec amour à Saint-Tropez. Livraison offerte en France.',
  openGraph: {
    title: 'Maison Pomeranian — Accessoires & Soins pour Spitz nain',
    description:
      'Boutique spécialisée accessoires et soins Pomeranian. Collections exclusives pour Spitz nain, conçues avec amour à Saint-Tropez.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Maison Pomeranian',
    images: [
      {
        url: 'https://maison-pomeranian.com/api/og?type=default',
        width: 1200,
        height: 630,
        alt: 'Maison Pomeranian — Accessoires et Soins pour Pomeranian',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Pomeranian — Accessoires & Soins Pomeranian',
    description:
      'Boutique spécialisée accessoires et soins pour Spitz nain. Conçue avec amour à Saint-Tropez.',
      images: ['https://maison-pomeranian.com/api/og?type=default'],
  },
  keywords: [
    'accessoires Pomeranian',
    'soins Pomeranian',
    'boutique Pomeranian',
    'Spitz nain',
    'soins cosmétiques Spitz nain',
    'accessoires Spitz nain',
    'soins pelage Pomeranian',
    'boutique chien France',
    'Pomeranian Saint-Tropez',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Maison Pomeranian',
  description:
    'Boutique spécialisée accessoires et soins Pomeranian, conçue avec amour à Saint-Tropez.',
  url: 'https://maison-pomeranian.com',
  image: 'https://maison-pomeranian.com/og-image.jpg',
  logo: 'https://maison-pomeranian.com/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Saint-Tropez',
    addressCountry: 'FR',
  },
  sameAs: [],
  offers: {
    '@type': 'AggregateOffer',
    description: 'Accessoires et soins cosmétiques pour Pomeranian et Spitz nain',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        <CollectionsGrid />
        <ExpertiseSection />
      </main>
      <Footer />
    </>
  );
}
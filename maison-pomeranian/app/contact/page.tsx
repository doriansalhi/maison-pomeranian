import type { Metadata } from 'next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Maison Pomeranian | Soins & Accessoires Pomeranian',
  description:
    'Une question sur nos soins Pomeranian ou nos accessoires Spitz nain ? Contactez Maison Pomeranian. Réponse sous 48h.',
  openGraph: {
    title: 'Contact — Maison Pomeranian',
    description:
      'Une question sur nos soins Pomeranian ou nos accessoires Spitz nain ? Contactez-nous, nous répondons sous 48h.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Maison Pomeranian',
    description:
      'Une question sur nos soins Pomeranian ou nos accessoires Spitz nain ? Contactez-nous.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Maison Pomeranian',
  description: 'Page de contact de Maison Pomeranian — soins et accessoires pour Pomeranian.',
  url: 'https://maison-pomeranian.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Maison Pomeranian',
    email: 'maison-pomeranian@outlook.fr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Saint-Tropez',
      addressCountry: 'FR',
    },
  },
};

export default function ContactPage() {
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
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">Nous écrire</span>
                <span className="h-px w-12 bg-orose-400" />
              </div>
              <h1 className="font-serif text-5xl lg:text-6xl text-terre leading-[1.05] text-balance">
                Une question ?{' '}
                <em className="text-orose-500 not-italic font-light italic">
                  Une envie ?
                </em>
              </h1>
              <p className="mt-6 text-terre/70 leading-relaxed text-lg">
                Une question sur nos <strong>soins Pomeranian</strong> ou nos <strong>accessoires Spitz nain</strong> ? Nous lisons chaque message avec attention et répondons sous 48h.
              </p>
            </div>
          </ScrollReveal>

          <ContactForm />

          <ScrollReveal>
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="bg-pur rounded-cloud p-6 border-soft text-center">
                <div className="text-orose-500 text-2xl mb-2">✉️</div>
                <div className="soft-label text-orose-500 text-[0.65rem] mb-1">
                  Par email
                </div>
                <div className="font-serif text-lg text-terre italic">
                  maison-pomeranian@outlook.fr
                </div>
              </div>
              <div className="bg-pur rounded-cloud p-6 border-soft text-center">
                <div className="text-orose-500 text-2xl mb-2">📍</div>
                <div className="soft-label text-orose-500 text-[0.65rem] mb-1">
                  Notre maison
                </div>
                <div className="font-serif text-lg text-terre italic">
                  Saint-Tropez, France
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
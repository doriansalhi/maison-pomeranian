import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = {
  title: 'Livraison — Maison Pomeranian | Accessoires & Soins Pomeranian',
  description:
    'Livraison offerte en France pour vos commandes d\'accessoires et soins Pomeranian. Expédition soignée, emballage éco-responsable, livraison internationale disponible.',
  alternates: { canonical: 'https://maison-pomeranian.com/livraison' },
  openGraph: {
    title: 'Livraison — Maison Pomeranian',
    description:
      'Livraison offerte en France pour vos accessoires et soins Pomeranian. Emballage fait main, éco-responsable.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livraison — Maison Pomeranian',
    description:
      'Livraison offerte en France pour vos accessoires et soins Pomeranian.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Livraison — Maison Pomeranian',
  description: 'Modalités de livraison pour les commandes d\'accessoires et soins Pomeranian.',
  url: 'https://maison-pomeranian.com/livraison',
  provider: {
    '@type': 'Organization',
    name: 'Maison Pomeranian',
    url: 'https://maison-pomeranian.com',
  },
};

export default function LivraisonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <header className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">Service</span>
                <span className="h-px w-12 bg-orose-400" />
              </div>
              <h1 className="font-serif text-5xl lg:text-6xl text-terre leading-[1.05] text-balance">
                Expédition{' '}
                <em className="text-orose-500 not-italic font-light italic">
                  douce.
                </em>
              </h1>
              <p className="mt-6 text-terre/70 leading-relaxed text-lg">
                Chaque commande d&apos;<strong>accessoires</strong> et de <strong>soins Pomeranian</strong> est préparée à la main, dans un emballage tendre et éco-responsable.
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <section className="bg-pur rounded-cloud p-8 lg:p-12 border-soft shadow-soft mb-12">
              <h2 className="font-serif text-3xl text-terre italic mb-8">
                Nos tarifs
              </h2>
              <div className="space-y-6">
                {[
                  ['France métropolitaine', 'Offerte', '48h'],
                  ['Express signature', '15 €', '24h'],
                  ['Europe', 'Calculé au panier', '3-5 jours'],
                  ['International', 'Sur devis', '7-14 jours'],
                ].map(([zone, price, time]) => (
                  <div
                    key={zone}
                    className="flex items-center justify-between py-3 border-b border-peche-100 last:border-0"
                  >
                    <div>
                      <div className="font-serif text-lg text-terre">{zone}</div>
                      <div className="soft-label text-terre/50 text-[0.65rem] mt-1">
                        {time}
                      </div>
                    </div>
                    <div className="font-serif text-lg text-orose-500">
                      {price}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="grid md:grid-cols-3 gap-6">
              {[
                ['📦', 'Emballage tendre', 'Papier de soie, carton recyclé, ruban en lin'],
                ['🌱', 'Éco-responsable', 'Aucun plastique inutile, encres végétales'],
                ['💌', 'Mot personnel', 'Une carte écrite à la main pour chaque commande'],
              ].map(([icon, title, desc]) => (
                <div
                  key={title}
                  className="bg-pur rounded-cloud p-6 border-soft text-center"
                >
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-serif text-lg text-terre mb-2 italic">
                    {title}
                  </h3>
                  <p className="text-terre/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
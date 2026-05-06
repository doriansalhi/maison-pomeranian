import Image from 'next/image';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';

export const metadata = {
  title: 'Notre Histoire — Maison Pomeranian, née pour le Spitz nain',
  description:
    'Découvrez l\'histoire de Maison Pomeranian : une boutique née d\'un amour pour le Spitz nain, des soins Pomeranian premium et des accessoires conçus avec amour à Saint-Tropez.',
  openGraph: {
    title: 'Notre Histoire — Maison Pomeranian',
    description:
      'Une boutique née d\'un amour pour le Spitz nain. Soins Pomeranian et accessoires premium, conçus avec amour à Saint-Tropez.',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dci5mreqo/image/upload/v1777645521/IMG_0768_x7yczd.jpg',
        width: 1200,
        height: 630,
        alt: 'Daysi, Spitz nain de Maison Pomeranian — Saint-Tropez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre Histoire — Maison Pomeranian',
    description:
      'Une boutique née d\'un amour pour le Spitz nain. Soins et accessoires Pomeranian premium.',
    images: ['https://res.cloudinary.com/dci5mreqo/image/upload/v1777645521/IMG_0768_x7yczd.jpg'],
  },
  keywords: [
    'Maison Pomeranian',
    'histoire Pomeranian',
    'soins Pomeranian',
    'accessoires Pomeranian',
    'Spitz nain France',
    'boutique Pomeranian Saint-Tropez',
    'savoir-faire français chien',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Notre Histoire — Maison Pomeranian',
  description:
    'L\'histoire de Maison Pomeranian, née d\'un amour pour le Spitz nain et d\'un savoir-faire artisanal français.',
  url: 'https://maison-pomeranian.com/heritage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Maison Pomeranian',
    url: 'https://maison-pomeranian.com',
    foundingLocation: 'Saint-Tropez, France',
    description:
      'Boutique spécialisée soins et accessoires pour Pomeranian et Spitz nain, fondée à Saint-Tropez.',
    logo: 'https://maison-pomeranian.com/logo.png',
  },
};

export default function HeritagePage() {
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
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <section className="relative max-w-4xl mx-auto px-6 lg:px-12 mb-24">
          <ScrollReveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">
                  Notre histoire
                </span>
                <span className="h-px w-12 bg-orose-400" />
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl text-terre leading-[1.05] text-balance">
                Une histoire d&apos;amour{' '}
                <em className="text-orose-500 not-italic font-light italic">
                  pour le Spitz.
                </em>
              </h1>
              <p className="mt-8 text-terre/70 leading-relaxed text-lg lg:text-xl italic font-serif">
                Du sable de Pampelonne à nos ateliers, une aventure cousue main
                avec tendresse — et des <strong>soins Pomeranian</strong> pensés pour votre <strong>Spitz nain</strong>.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 lg:px-12 mb-24">
          <ScrollReveal>
            <div className="relative">
              <div
                className="absolute -inset-12 rounded-cloud blur-3xl opacity-70 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(245,183,154,0.55) 0%, rgba(244,200,192,0.35) 40%, transparent 75%)',
                }}
              />

              <div className="relative aspect-[16/9] rounded-cloud overflow-hidden shadow-2xl ring-1 ring-peche-200/40 transform transition-all duration-700 hover:scale-[1.01]">
                <Image
                  src="https://res.cloudinary.com/dci5mreqo/image/upload/v1777645521/IMG_0768_x7yczd.jpg"
                  alt="Daysi, Spitz nain fondatrice de Maison Pomeranian à Saint-Tropez"
                  fill
                  priority
                  quality={95}
                  sizes="(min-width: 1024px) 1152px, 100vw"
                  className="object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-terre/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 bg-pur/95 backdrop-blur-md rounded-soft px-5 py-3 shadow-warm">
                  <div className="soft-label text-orose-500 text-[0.65rem]">
                    Notre Spitz nain
                  </div>
                  <div className="font-serif text-base text-terre mt-0.5 italic">
                    Daysi
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="relative max-w-3xl mx-auto px-6 lg:px-12 space-y-16">
          <ScrollReveal>
            <article className="prose-custom space-y-6">
              <h2 className="font-serif text-3xl lg:text-4xl text-terre italic">
                Tout a commencé par une rencontre.
              </h2>
              <p className="text-terre/80 leading-relaxed text-lg">
                On dit souvent que ce n'est pas nous qui choisissons notre chien, mais que c'est lui qui nous trouve. Pour moi, ce fut une évidence le jour où <strong>Daysi</strong>, mon <strong>Spitz nain</strong>, est entrée dans ma vie.
              </p>
              <p className="text-terre/70 leading-relaxed">
                L'idée de cette maison est née d'un constat simple, presque frustrant : je voulais le meilleur pour elle, mais je me perdais dans une offre générique qui ne respectait pas les spécificités de sa race. Entre son <strong>pelage si délicat</strong>, sa morphologie particulière et son tempérament de feu, Daysi méritait une attention sur-mesure. C'est ainsi qu'est né ce projet : créer un univers dédié exclusivement aux <strong>soins Pomeranian</strong> et aux <strong>accessoires Spitz nain</strong>, à la hauteur de leur élégance naturelle.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal>
            <article className="prose-custom space-y-6">
              <h2 className="font-serif text-3xl lg:text-4xl text-terre italic">
                Un savoir-faire français.
              </h2>
              <p className="text-terre/80 leading-relaxed text-lg">
                Choisir de mettre en avant le <strong>savoir-faire français</strong>, c'est avant tout faire le choix de l'éthique et de la durabilité. Dans un monde de consommation rapide, j'ai pris le parti de revenir à l'essentiel : la qualité artisanale et la précision de nos régions — pour des <strong>soins cosmétiques Pomeranian</strong> et des <strong>accessoires</strong> qui durent vraiment.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal>
            <article className="prose-custom space-y-6">
              <h2 className="font-serif text-3xl lg:text-4xl text-terre italic">
                Saint-Tropez, l&apos;art de vivre.
              </h2>
              <p className="text-terre/80 leading-relaxed text-lg">
                Si l'idée de cette maison est née de ma rencontre avec Daysi, son esprit, lui, puise sa source dans l'art de vivre tropézien. <strong>Saint-Tropez</strong>, c'est cette lumière unique qui fait briller le <strong>pelage des Spitz</strong> comme nulle part ailleurs. C'est un mélange audacieux entre le charme authentique des ruelles provençales et le glamour de la Riviera. C'est cet équilibre que j'ai voulu insuffler à ma boutique de <strong>soins et accessoires Pomeranian</strong>.
              </p>
            </article>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {[
                ['✦', 'Made in France', 'Tous nos produits, conçus et fabriqués dans nos ateliers en France.'],
                ['✦', 'Matières naturelles', "Nos soins sont formulés pour respecter l'équilibre délicat de la peau et du double poil du Pomeranian, sans jamais l'agresser."],
                ['✦', 'Testé avec amour', 'Chaque pièce est testée par Daysi avant de rejoindre la collection.'],
              ].map(([icon, title, desc]) => (
                <div
                  key={title}
                  className="bg-pur p-8 rounded-cloud border-soft shadow-soft text-center"
                >
                  <div className="text-orose-500 text-3xl mb-3">{icon}</div>
                  <h3 className="font-serif text-xl text-terre mb-3 italic">
                    {title}
                  </h3>
                  <p className="text-terre/60 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-sunset-soft rounded-cloud p-12 lg:p-16 text-center mt-16">
              <h2 className="font-serif text-3xl lg:text-4xl text-terre italic mb-4">
                Rejoignez Le Cercle
              </h2>
              <p className="text-terre/70 max-w-xl mx-auto leading-relaxed mb-8">
                Recevez nos nouveautés en avant-première et les histoires de
                nos Loulous. Avec tendresse, jamais en spam.
              </p>
              <Link
                href="/le-cercle"
                className="inline-block px-8 py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
              >
                <span className="soft-label">Devenir membre</span>
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
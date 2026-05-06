import { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Mentions légales | Maison Pomeranian',
  description:
    'Mentions légales de Maison Pomeranian — boutique spécialisée accessoires et soins pour Spitz nain (Pomeranian). Éditeur, hébergement, RGPD, cookies.',
  robots: { index: true, follow: false },
  alternates: {
    canonical: 'https://maison-pomeranian.com/mentions',
  },
  openGraph: {
    title: 'Mentions légales | Maison Pomeranian',
    description:
      "Informations légales relatives au site Maison Pomeranian, boutique d'accessoires pour Pomeranian.",
    url: 'https://maison-pomeranian.com/mentions',
    siteName: 'Maison Pomeranian',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mentions légales — Maison Pomeranian',
  url: 'https://maison-pomeranian.com/mentions',
  description:
    "Mentions légales de Maison Pomeranian, boutique d'accessoires et soins pour Pomeranian (Spitz nain).",
  inLanguage: 'fr-FR',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Maison Pomeranian',
    url: 'https://maison-pomeranian.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Maison Pomeranian',
    url: 'https://maison-pomeranian.com',
    email: 'maison-pomeranian@outlook.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chemin de Château Gombert',
      addressLocality: 'Marseille',
      postalCode: '13001',
      addressCountry: 'FR',
    },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://maison-pomeranian.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mentions légales',
        item: 'https://maison-pomeranian.com/mentions',
      },
    ],
  },
};

export default function MentionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPageLayout
        label="Mentions légales"
        title="Mentions"
        titleAccent="légales"
        intro="Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique."
      >
        <div className="space-y-8">
          <section aria-labelledby="editeur">
            <h2
              id="editeur"
              className="font-serif text-2xl text-terre mb-3 italic"
            >
              Éditeur du site
            </h2>
            <address className="text-terre/70 leading-relaxed space-y-1 not-italic">
              <p>
                <strong>Maison Pomeranian</strong> — boutique d&apos;accessoires
                et soins pour Pomeranian
              </p>
              <p>Entreprise individuelle — Salhi</p>
              <p>Chemin de Château Gombert, 13001 Marseille, France</p>
              <p>SIRET : en cours d&apos;immatriculation</p>
              <p>
                Email :{' '}
                
                  href="mailto:maison-pomeranian@outlook.fr"
                  className="underline hover:text-terre transition-colors"
                  {">"} maison-pomeranian@outlook.fr
                </a>
              </p>
              <p>Directeur de la publication : Salhi</p>
            </address>
          </section>

          <section aria-labelledby="hebergement">
            <h2
              id="hebergement"
              className="font-serif text-2xl text-terre mb-3 italic"
            >
              Hébergement
            </h2>
            <address className="text-terre/70 leading-relaxed not-italic">
              <p>Vercel Inc.</p>
              <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p>
                
              <a
  href="https://vercel.com"
  target="_blank"
  rel="noopener noreferrer"
  className="underline hover:text-terre transition-colors"
>
  https://vercel.com
</a>
              </p>
            </address>
          </section>

          <section aria-labelledby="propriete">
            <h2
              id="propriete"
              className="font-serif text-2xl text-terre mb-3 italic"
            >
              Propriété intellectuelle
            </h2>
            <p className="text-terre/70 leading-relaxed">
              L&apos;ensemble du contenu de ce site (textes, images,
              photographies, logos, marques) est la propriété exclusive de{' '}
              <strong>Maison Pomeranian</strong> et est protégé par le droit
              d&apos;auteur. Toute reproduction, même partielle, est strictement
              interdite sans autorisation préalable écrite.
            </p>
          </section>

          <section aria-labelledby="donnees">
            <h2
              id="donnees"
              className="font-serif text-2xl text-terre mb-3 italic"
            >
              Données personnelles
            </h2>
            <p className="text-terre/70 leading-relaxed">
              Les informations recueillies sur ce site sont traitées
              conformément au Règlement Général sur la Protection des Données
              (RGPD — Règlement UE 2016/679). Vous disposez d&apos;un droit
              d&apos;accès, de rectification, de suppression et
              d&apos;opposition. Pour exercer ces droits, contactez-nous à{' '}
              
                href="mailto:maison-pomeranian@outlook.fr"
                className="underline hover:text-terre transition-colors"
                {">"} maison-pomeranian@outlook.fr              
                </a>
              .
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2
              id="cookies"
              className="font-serif text-2xl text-terre mb-3 italic"
            >
              Cookies
            </h2>
            <p className="text-terre/70 leading-relaxed">
              Ce site utilise des cookies techniques nécessaires à son
              fonctionnement (panier, session) et des cookies de mesure
              d&apos;audience anonymisés. Vous pouvez gérer vos préférences via
              les paramètres de votre navigateur.
            </p>
          </section>
        </div>
      </LegalPageLayout>
    </>
  );
}
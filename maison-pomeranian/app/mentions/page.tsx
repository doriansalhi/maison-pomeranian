import { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Mentions légales | Maison Pomeranian',
  description: 'Mentions légales de Maison Pomeranian.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://maison-pomeranian.com/mentions' },
};

export default function MentionsPage() {
  return (
    <LegalPageLayout
      label="Mentions légales"
      title="Mentions"
      titleAccent="légales"
      intro="Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004."
    >
      <div className="space-y-8">
        <section aria-labelledby="editeur">
          <h2 id="editeur" className="font-serif text-2xl text-terre mb-3 italic">
            Éditeur du site
          </h2>
          <address className="text-terre/70 leading-relaxed space-y-1 not-italic">
            <p><strong>Maison Pomeranian</strong></p>
            <p>Entreprise individuelle — Salhi</p>
            <p>Chemin de Château Gombert, 13001 Marseille, France</p>
            <p>SIRET : en cours d&apos;immatriculation</p>
            <p>Email : maison-pomeranian@outlook.fr</p>
            <p>Directeur de la publication : Salhi</p>
          </address>
        </section>

        <section aria-labelledby="hebergement">
          <h2 id="hebergement" className="font-serif text-2xl text-terre mb-3 italic">
            Hébergement
          </h2>
          <address className="text-terre/70 leading-relaxed not-italic">
            <p>Vercel Inc.</p>
            <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
            <p>https://vercel.com</p>
          </address>
        </section>

        <section aria-labelledby="propriete">
          <h2 id="propriete" className="font-serif text-2xl text-terre mb-3 italic">
            Propriété intellectuelle
          </h2>
          <p className="text-terre/70 leading-relaxed">
            L&apos;ensemble du contenu de ce site est la propriété exclusive de{' '}
            <strong>Maison Pomeranian</strong> et est protégé par le droit
            d&apos;auteur. Toute reproduction est strictement interdite sans autorisation.
          </p>
        </section>

        <section aria-labelledby="donnees">
          <h2 id="donnees" className="font-serif text-2xl text-terre mb-3 italic">
            Données personnelles
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les informations recueillies sont traitées conformément au RGPD.
            Pour exercer vos droits, contactez-nous à maison-pomeranian@outlook.fr.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies" className="font-serif text-2xl text-terre mb-3 italic">
            Cookies
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Ce site utilise des cookies techniques et des cookies de mesure
            d&apos;audience anonymisés.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
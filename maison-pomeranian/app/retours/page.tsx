import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata = {
  title: 'Retours & Remboursements — Maison Pomeranian',
  description:
    'Retours gratuits sous 30 jours pour vos accessoires et soins Pomeranian. Remboursement sous 14 jours, sans questions. Maison Pomeranian.',
  openGraph: {
    title: 'Retours & Remboursements — Maison Pomeranian',
    description:
      'Retours gratuits sous 30 jours pour vos accessoires et soins Pomeranian. Remboursement sous 14 jours.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retours & Remboursements — Maison Pomeranian',
    description:
      'Retours gratuits sous 30 jours pour vos accessoires et soins Pomeranian.',
  },
};

export default function RetoursPage() {
  return (
    <LegalPageLayout
      label="Service"
      title="Retours"
      titleAccent="& remboursements"
      intro="Vous avez 30 jours pour changer d'avis. Tendrement, sans questions."
    >
      <div className="space-y-8">
        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Notre engagement
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Si un <strong>accessoire Pomeranian</strong> ou un <strong>soin Spitz nain</strong> ne vous convient pas,
            ou si simplement vous changez d&apos;avis, vous disposez de 30 jours
            à compter de la réception pour nous le retourner. C&apos;est plus
            que ce que la loi exige (14 jours), parce qu&apos;on tient à votre
            tranquillité.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Conditions
          </h2>
          <ul className="text-terre/70 leading-relaxed space-y-2 list-none">
            <li className="flex gap-3">
              <span className="text-orose-500">✦</span>
              <span>L&apos;article doit être neuf, non utilisé, dans son emballage d&apos;origine</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orose-500">✦</span>
              <span>Étiquettes encore présentes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orose-500">✦</span>
              <span>Les retours sont gratuits en France métropolitaine</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orose-500">✦</span>
              <span>Remboursement sous 14 jours après réception du retour</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Comment retourner ?
          </h2>
          <ol className="text-terre/70 leading-relaxed space-y-3 list-decimal pl-5">
            <li>Écrivez-nous à maison-pomeranian@outlook.fr avec votre numéro de commande</li>
            <li>Nous vous envoyons une étiquette de retour prépayée</li>
            <li>Glissez l&apos;article dans son emballage d&apos;origine et collez l&apos;étiquette</li>
            <li>Déposez le colis au point relais ou bureau de poste</li>
            <li>Le remboursement est effectué dès réception</li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Échanges
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Vous souhaitez une autre taille ou un autre coloris pour votre <strong>accessoire Pomeranian</strong> ? Pas de souci,
            écrivez-nous et on s&apos;arrange. La nouvelle pièce vous est
            expédiée dès réception du retour.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article défectueux
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Si jamais un article arrivait abîmé ou présentait un défaut, écrivez-nous
            avec une photo. Nous le remplaçons immédiatement, sans démarche
            supplémentaire de votre part.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-peche-200/50 text-center">
        <p className="font-serif text-lg text-terre italic mb-2">
          Une question avant de commander ?
        </p>
        
          href="mailto:maison-pomeranian@outlook.fr"
          className="soft-label text-orose-500 transition-all duration-500 ease-in-out hover:text-orose-600"
        >
          maison-pomeranian@outlook.fr →
        </a>
      </div>
    </LegalPageLayout>
  );
}
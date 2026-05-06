import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata = {
  title: 'CGV — Conditions Générales de Vente | Maison Pomeranian',
  description:
    'Conditions générales de vente de Maison Pomeranian — boutique d\'accessoires et soins Pomeranian. Paiement sécurisé, livraison offerte, retours 30 jours.',
  openGraph: {
    title: 'CGV — Maison Pomeranian',
    description:
      'Conditions générales de vente de Maison Pomeranian — accessoires et soins Pomeranian.',
    type: 'website',
  },
};

export default function CgvPage() {
  return (
    <LegalPageLayout
      label="Mentions légales"
      title="Conditions"
      titleAccent="Générales de Vente"
      intro="Les présentes conditions régissent les ventes effectuées sur le site Maison Pomeranian."
    >
      <p className="text-terre/50 text-sm italic mb-8 text-center">
        Dernière mise à jour : 1er juin 2026
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 1 — Objet
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>Maison Pomeranian</strong>, entreprise individuelle exploitée sous le nom Salhi, dont le siège est situé chemin de Château Gombert, 13001 Marseille, France (SIRET en cours d'immatriculation), et toute personne physique ou morale souhaitant effectuer un achat via le site maison-pomeranian.com. Toute commande implique l'acceptation pleine et entière des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 2 — Acceptation des conditions
          </h2>
          <p className="text-terre/70 leading-relaxed">
            En passant commande sur le site, l'acheteur reconnaît avoir pris connaissance des présentes CGV et les accepte sans réserve. Ces conditions prévalent sur tout autre document, sauf accord dérogatoire express et écrit de Maison Pomeranian.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 3 — Produits
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les produits proposés à la vente sont ceux figurant sur le site au moment de la consultation. Les photographies et descriptions sont présentées à titre indicatif et ne sont pas contractuelles. <strong>Maison Pomeranian</strong> s'engage à proposer des <strong>accessoires et soins Pomeranian</strong> de qualité, conformes à leur description. En cas d'indisponibilité d'un produit après passation de commande, l'acheteur en sera informé dans les meilleurs délais et pourra choisir entre un remboursement intégral ou un produit de substitution.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 4 — Prix
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les prix sont indiqués en euros, toutes taxes comprises (TTC). Maison Pomeranian se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable à la commande est celui en vigueur au moment de la validation de ladite commande. Les frais de livraison sont indiqués au moment de la validation du panier et peuvent varier selon la destination et le mode d'expédition choisi.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 5 — Commande
          </h2>
          <p className="text-terre/70 leading-relaxed">
            L'acheteur sélectionne les produits qu'il souhaite acquérir, les ajoute à son panier et procède à la validation de sa commande après vérification du contenu de son panier. La commande est confirmée après paiement effectif. Un email de confirmation récapitulant les détails de la commande est envoyé à l'adresse email fournie par l'acheteur. Maison Pomeranian se réserve le droit d'annuler toute commande suspecte ou en cas d'erreur manifeste de prix.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 6 — Paiement
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Le paiement s'effectue en ligne, de manière sécurisée, via la plateforme Stripe. Les moyens de paiement acceptés sont les cartes bancaires (Visa, Mastercard, American Express). Le débit est effectué au moment de la validation de la commande. Les données bancaires de l'acheteur sont cryptées et ne sont jamais stockées sur nos serveurs. Maison Pomeranian ne saurait être tenue responsable de tout incident lié à l'utilisation du réseau internet lors du paiement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 7 — Livraison
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les commandes sont expédiées dans un délai de 48 heures ouvrées après confirmation du paiement. La livraison est effectuée à l'adresse indiquée par l'acheteur lors de la commande. Maison Pomeranian livre en France métropolitaine et dans plusieurs pays européens. En cas de retard imputable au transporteur, Maison Pomeranian ne saurait être tenue responsable. Un numéro de suivi est communiqué par email dès l'expédition du colis.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 8 — Droit de rétractation
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Conformément à l'article L.221-18 du Code de la consommation, l'acheteur dispose d'un délai de 30 jours à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités. Pour exercer ce droit, l'acheteur doit contacter Maison Pomeranian à l'adresse maison-pomeranian@outlook.fr en indiquant son numéro de commande. Les frais de retour sont pris en charge par Maison Pomeranian. Le remboursement est effectué dans un délai de 14 jours après réception du retour.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 9 — Garanties
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Tous les produits bénéficient de la garantie légale de conformité (articles L.217-4 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil). En cas de défaut de conformité, l'acheteur peut demander la réparation ou le remplacement du produit, ou à défaut, une réduction du prix ou la résolution du contrat.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 10 — Responsabilité
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Maison Pomeranian ne saurait être tenue responsable des dommages indirects résultant de l'utilisation des produits vendus sur le site. En cas de force majeure (catastrophe naturelle, grève, etc.), Maison Pomeranian sera déchargée de ses obligations sans qu'aucune indemnité ne soit due à l'acheteur.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 11 — Données personnelles
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les données personnelles collectées lors de la commande sont nécessaires au traitement de celle-ci et peuvent être transmises aux sociétés partenaires chargées de la livraison. Conformément au Règlement Général sur la Protection des Données (RGPD), l'acheteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles en contactant Maison Pomeranian à l'adresse maison-pomeranian@outlook.fr.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-terre mb-3 italic">
            Article 12 — Loi applicable
          </h2>
          <p className="text-terre/70 leading-relaxed">
            Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, le tribunal compétent sera celui du ressort de Marseille.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-peche-200/50 text-center text-sm text-terre/50 italic">
        Pour toute question : maison-pomeranian@outlook.fr
      </div>
    </LegalPageLayout>
  );
}
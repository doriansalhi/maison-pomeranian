import { Metadata } from 'next';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ — Maison Pomeranian',
  description:
    'Toutes les réponses à vos questions sur les accessoires et soins pour Pomeranian. Livraison, retours, matières, conseils.',
  alternates: { canonical: 'https://maison-pomeranian.com/faq' },
  openGraph: {
    title: 'FAQ — Maison Pomeranian',
    description: 'Vos questions sur nos accessoires et soins pour Pomeranian.',
    url: 'https://maison-pomeranian.com/faq',
    siteName: 'Maison Pomeranian',
    locale: 'fr_FR',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'Nous expédions sous 24 à 48h ouvrées. La livraison standard est offerte en France métropolitaine et prend 1 à 2 jours ouvrés. Une option express signature en 24h est disponible pour 15€.',
  },
  {
    question: 'Les produits sont-ils adaptés à tous les Pomeranians ?',
    answer:
      'Oui. Nos accessoires et soins sont conçus spécifiquement pour le Spitz nain (Pomeranian), en tenant compte de leur morphologie délicate et de leur pelage dense à double couche.',
  },
  {
    question: 'Quelles matières utilisez-vous pour vos accessoires ?',
    answer:
      'Nous sélectionnons uniquement des matières douces et hypoallergéniques : coton biologique, velours naturel, cuir végétal tanné. Aucun produit chimique agressif, toujours avec la sécurité de votre Loulou en tête.',
  },
  {
    question: 'Comment fonctionne la politique de retour ?',
    answer:
      'Vous disposez de 30 jours après réception pour retourner un article non utilisé dans son emballage d\'origine. Les retours sont gratuits en France métropolitaine. Le remboursement est effectué sous 14 jours.',
  },
  {
    question: 'Puis-je suivre ma commande ?',
    answer:
      'Oui. Depuis votre espace Le Cercle, vous accédez à l\'historique de vos commandes et à leur statut en temps réel. Un numéro de suivi vous est communiqué dès l\'expédition.',
  },
  {
    question: 'Les soins sont-ils testés dermatologiquement ?',
    answer:
      'Tous nos soins sont formulés sans sulfates, sans parabènes et sans colorants artificiels. Ils sont testés sous contrôle vétérinaire et adaptés à la peau sensible des Pomeranians.',
  },
  {
    question: 'Livrez-vous en dehors de France ?',
    answer:
      'Oui, nous livrons en Belgique, Luxembourg, Suisse, Monaco, Italie, Espagne, Allemagne, Pays-Bas, Grande-Bretagne, Irlande et Portugal. Les délais varient de 2 à 5 jours ouvrés selon le pays.',
  },
  {
    question: 'Comment utiliser un code promotionnel ?',
    answer:
      'Lors du paiement, un champ "Code promotionnel" apparaît sur la page de checkout Stripe. Entrez votre code et la réduction s\'applique automatiquement avant la confirmation.',
  },
  {
    question: 'Comment créer un compte sur Maison Pomeranian ?',
    answer:
      'Vous pouvez vous inscrire via votre compte Google ou avec votre adresse email et un mot de passe depuis la page d\'inscription. L\'accès à Le Cercle vous permet de gérer vos commandes et le profil de votre Loulou.',
  },
  {
    question: 'Que contient Le Cercle ?',
    answer:
      'Le Cercle est l\'espace privé des membres de la Maison. Il vous permet de suivre vos commandes, d\'enregistrer le profil de votre Pomeranian et de recevoir les invitations aux préventes et nouveautés en avant-première.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
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
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-orose-400" />
              <span className="soft-label text-orose-500">Questions fréquentes</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-terre leading-tight">
              Tout ce que vous{' '}
              <em className="text-orose-500 not-italic font-light italic">
                voulez savoir
              </em>
            </h1>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-pur rounded-cloud border-soft shadow-soft overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <h2 className="font-serif text-lg text-terre">{faq.question}</h2>
                  <span className="shrink-0 text-orose-500 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-terre/70 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
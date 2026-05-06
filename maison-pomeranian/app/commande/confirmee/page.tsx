import Link from 'next/link';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ClearCartOnMount from '@/components/ClearCartOnMount';

export const metadata = {
  title: 'Commande confirmée',
  description: 'Merci pour votre commande !',
};

export default function CommandeConfirmeePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      {/* Vide automatiquement le panier après la commande */}
      <ClearCartOnMount />

      <main className="min-h-screen bg-creme pt-32 pb-24 relative overflow-hidden flex items-center">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(244,200,192,0.5) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <div className="text-6xl mb-8 animate-float-soft">🐾</div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-orose-400" />
              <span className="soft-label text-orose-500">Commande validée</span>
              <span className="h-px w-12 bg-orose-400" />
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-terre leading-[1.05] text-balance">
              Merci{' '}
              <em className="text-orose-500 not-italic font-light italic">
                infiniment.
              </em>
            </h1>
            <p className="mt-8 text-terre/70 leading-relaxed text-lg">
              Votre commande nous est bien parvenue. Vous recevrez un email de
              confirmation dans les prochaines minutes, puis votre numéro de
              suivi dès l&apos;expédition.
            </p>

            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link
                href="/le-cercle"
                className="px-8 py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
              >
                <span className="soft-label">Voir mes commandes</span>
              </Link>
              <Link
                href="/collections"
                className="px-8 py-4 border-soft text-terre rounded-pill transition-all duration-500 ease-in-out hover:border-peche-400 hover:text-orose-500 bg-pur/50"
              >
                <span className="soft-label">Continuer la balade</span>
              </Link>
            </div>

            <p className="mt-12 text-sm text-terre/50 italic">
              Avec amour, la Maison Pomeranian ✦
            </p>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

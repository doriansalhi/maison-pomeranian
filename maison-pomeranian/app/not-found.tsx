import Link from 'next/link';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24 flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-7xl mb-8">🐾</div>
          <div className="font-serif text-8xl text-orose-500 italic mb-4">
            404
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-terre leading-tight mb-6">
            Cette page s&apos;est{' '}
            <em className="text-orose-500 not-italic font-light italic">
              égarée.
            </em>
          </h1>
          <p className="text-terre/70 leading-relaxed mb-10 max-w-md mx-auto">
            On dirait que cette page est partie en balade. Pas de panique, on
            vous ramène à l&apos;accueil.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
          >
            <span className="soft-label">Retour à la maison</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

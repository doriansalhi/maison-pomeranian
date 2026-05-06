import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import DogProfilesPanel from '@/components/dashboard/DogProfilesPanel';

export const metadata = {
  title: 'Le Cercle',
  description: "L'espace privé des membres de la Maison Pomeranian.",
};

export default async function CerclePage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24 relative overflow-hidden">
        {/* Halo chaud */}
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          {/* ── En-tête de bienvenue ─────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-orose-400" />
              <span className="soft-label text-orose-500">
                Bienvenue dans Le Cercle
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl text-terre leading-[1.05] text-balance">
              Bonjour,{' '}
              <em className="text-orose-500 not-italic font-light italic">
                {user?.firstName ?? 'cher membre'}.
              </em>
            </h1>
            <p className="text-terre/70 mt-6 max-w-2xl leading-relaxed text-base lg:text-lg">
              Votre espace tendresse. Enregistrez Le Profil du Loulou, suivez
              vos commandes, et recevez les nouveautés en avant-première.
            </p>
          </div>

          {/* ── Stats overview ────────────────────────────── */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              ['Membre depuis', '2026'],
              ['Statut', 'Le Cercle'],
              ['Loulous', '—'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-pur p-8 rounded-cloud border-soft shadow-soft"
              >
                <div className="soft-label text-orose-500/70 mb-2 text-[0.65rem]">
                  {label}
                </div>
                <div className="font-serif text-2xl text-terre">{value}</div>
              </div>
            ))}
          </div>

          <DogProfilesPanel />
        </div>
      </main>
      <Footer />
    </>
  );
}


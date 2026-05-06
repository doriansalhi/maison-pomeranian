import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import DogProfilesPanel from '@/components/dashboard/DogProfilesPanel';
import { createServiceRoleSupabase } from '@/lib/supabase';

export const metadata = {
  title: 'Le Cercle',
  description: "L'espace prive des membres de la Maison Pomeranian.",
};

export default async function CerclePage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();

  const supabase = createServiceRoleSupabase();
  const { count } = await supabase
    .from('dog_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const loulouCount = count ?? 0;

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-ivoire pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-or-400" />
              <span className="tech-label text-or-500 font-mono">
                Membre · {user?.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl text-marine leading-[1.05] text-balance">
              Bienvenue,{' '}
              <em className="text-or-500 not-italic font-light">
                {user?.firstName ?? 'cher membre'}.
              </em>
            </h1>
            <p className="text-marine/70 mt-6 max-w-2xl leading-relaxed">
              Le Cercle est l&apos;espace prive de la Maison. Enregistrez Le
              Profil du Loulou, suivez vos commandes, et recevez les invitations
              aux preventes Riviera.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-marine/10 mb-20">
            {[
              ['Membre depuis', '2026'],
              ['Statut', 'Cercle'],
              ['Loulous', loulouCount > 0 ? String(loulouCount) : 'aucun'],
            ].map(([label, value]) => (
              <div key={label} className="bg-ivoire p-8">
                <div className="tech-label text-or-500/70 mb-2">{label}</div>
                <div className="font-serif text-2xl text-marine">{value}</div>
              </div>
            ))}
          </div>

          <section className="mb-20">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="soft-label text-orose-500 mb-2">Historique</div>
                <h2 className="font-serif text-3xl lg:text-4xl text-terre">
                  Mes commandes
                </h2>
              </div>
              <Link
                href="/le-cercle/commandes"
                className="inline-flex items-center gap-2 px-5 py-3 bg-pur text-terre border-soft rounded-pill transition-all duration-500 ease-in-out hover:border-peche-400 hover:text-orose-500"
              >
                <Package size={14} strokeWidth={1.5} />
                <span className="soft-label">Voir mes commandes</span>
                <ChevronRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="bg-pur rounded-cloud p-10 border-soft shadow-soft text-center">
              <Package size={28} strokeWidth={1} className="mx-auto text-peche-400 mb-4" />
              <p className="font-serif text-xl text-terre italic mb-2">Suivez vos livraisons</p>
              <p className="text-terre/60 text-sm max-w-sm mx-auto mb-6">
                Consultez l&apos;historique de vos commandes et suivez vos livraisons en temps reel.
              </p>
              <Link
                href="/le-cercle/commandes"
                className="inline-flex items-center gap-2 soft-label text-orose-500 transition-all duration-500 ease-in-out hover:gap-3"
              >
                Acceder a mes commandes <ChevronRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </section>

          <DogProfilesPanel />
        </div>
      </main>
      <Footer />
    </>
  );
}

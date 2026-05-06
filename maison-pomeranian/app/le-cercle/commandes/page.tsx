import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { createServerSupabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

export const metadata = {
  title: 'Mes commandes',
  description: 'Suivez l\'expédition de vos commandes Maison Pomeranian.',
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'text-terre/60 bg-sable' },
  paid: { label: 'Payée', color: 'text-orose-500 bg-peche-100' },
  preparing: { label: 'En préparation', color: 'text-orose-600 bg-peche-200' },
  shipped: { label: 'Expédiée', color: 'text-pur bg-peche-400' },
  delivered: { label: 'Livrée', color: 'text-pur bg-orose-500' },
  cancelled: { label: 'Annulée', color: 'text-terre/60 bg-sable' },
  refunded: { label: 'Remboursée', color: 'text-terre/60 bg-sable' },
};

function formatOrderDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function CommandesPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const supabase = await createServerSupabase();

  const { data: orders } = await supabase
    .from('orders')
    .select('id, created_at, amount_total, status, stripe_session_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24 relative overflow-hidden">
        {/* Halo */}
        <div
          className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          {/* Fil d'ariane */}
          <nav className="flex items-center gap-2 soft-label text-terre/50 mb-10 text-[0.65rem]">
            <Link
              href="/le-cercle"
              className="transition-all duration-500 ease-in-out hover:text-orose-500"
            >
              Le Cercle
            </Link>
            <span>/</span>
            <span className="text-orose-500">Mes commandes</span>
          </nav>

          {/* En-tête */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-orose-400" />
              <span className="soft-label text-orose-500">
                Le suivi de vos commandes
              </span>
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl text-terre leading-[1.05] text-balance">
              Mes{' '}
              <em className="text-orose-500 not-italic font-light italic">
                commandes
              </em>
            </h1>
          </div>

          {/* Liste des commandes */}
          {!orders || orders.length === 0 ? (
            <div className="bg-pur rounded-cloud p-16 text-center border-soft shadow-soft">
              <Package
                size={32}
                strokeWidth={1}
                className="mx-auto text-peche-400 mb-4"
              />
              <p className="font-serif text-2xl text-terre mb-3 italic">
                Aucune commande pour l&apos;instant
              </p>
              <p className="text-terre/60 max-w-md mx-auto leading-relaxed mb-8">
                Vos prochaines commandes s&apos;afficheront ici, avec leur
                statut d&apos;expédition.
              </p>
              <Link
                href="/collections"
                className="inline-block px-8 py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
              >
                <span className="soft-label">Découvrir les collections</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusInfo = STATUS_LABELS[order.status] ?? STATUS_LABELS.pending;
                return (
                  <Link
                    key={order.id}
                    href={`/le-cercle/commandes/${order.id}`}
                    className="group block bg-pur rounded-cloud p-6 lg:p-8 border-soft border-soft-hover shadow-soft transition-all duration-500 ease-in-out hover:shadow-warm hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <div className="soft-label text-orose-500/70 text-[0.65rem] mb-2">
                          Commande du {formatOrderDate(order.created_at)}
                        </div>
                        <div className="font-serif text-xl text-terre italic">
                          N° {order.id.slice(0, 8).toUpperCase()}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <span
                          className={`soft-label px-4 py-2 rounded-pill text-[0.65rem] ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                        <div className="font-serif text-xl text-terre">
                          {formatPrice(order.amount_total)}
                        </div>
                        <ChevronRight
                          size={20}
                          strokeWidth={1.5}
                          className="text-terre/40 transition-all duration-500 ease-in-out group-hover:text-orose-500 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Retour */}
          <div className="mt-12 text-center">
            <Link
              href="/le-cercle"
              className="inline-flex items-center gap-2 soft-label text-terre/70 transition-all duration-500 ease-in-out hover:text-orose-500"
            >
              ← Retour au Cercle
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
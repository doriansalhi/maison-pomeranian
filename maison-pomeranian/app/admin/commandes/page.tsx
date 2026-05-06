import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createServiceRoleSupabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

export const metadata = { title: 'Admin · Commandes' };

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-gray-100 text-gray-700' },
  paid: { label: 'Payée', color: 'bg-peche-100 text-orose-500' },
  preparing: { label: 'En préparation', color: 'bg-peche-200 text-orose-600' },
  shipped: { label: 'Expédiée', color: 'bg-peche-400 text-pur' },
  delivered: { label: 'Livrée', color: 'bg-orose-500 text-pur' },
  cancelled: { label: 'Annulée', color: 'bg-gray-200 text-gray-600' },
  refunded: { label: 'Remboursée', color: 'bg-gray-200 text-gray-600' },
};

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default async function AdminCommandesPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) ?? '';
  if (role !== 'admin') redirect('/');

  const supabase = createServiceRoleSupabase();
  const { data: ordersData } = await supabase
    .from('orders')
    .select('id, created_at, customer_email, customer_name, amount_total, status, tracking_number')
    .order('created_at', { ascending: false });

  const orders = (ordersData as any[]) ?? [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={20} strokeWidth={1.5} className="text-orose-500" />
            <span className="soft-label text-orose-500">Espace Admin</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-terre leading-tight italic mb-12">
            Toutes les commandes
          </h1>

          {orders.length === 0 ? (
            <div className="bg-pur rounded-cloud p-16 text-center border-soft shadow-soft">
              <p className="font-serif text-xl text-terre/60 italic">Aucune commande pour l&apos;instant.</p>
            </div>
          ) : (
            <div className="bg-pur rounded-cloud border-soft shadow-soft overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-peche-100 bg-creme/50">
                    <th className="text-left p-4 soft-label text-orose-500/80 text-[0.65rem]">N°</th>
                    <th className="text-left p-4 soft-label text-orose-500/80 text-[0.65rem]">Date</th>
                    <th className="text-left p-4 soft-label text-orose-500/80 text-[0.65rem]">Client</th>
                    <th className="text-left p-4 soft-label text-orose-500/80 text-[0.65rem]">Statut</th>
                    <th className="text-left p-4 soft-label text-orose-500/80 text-[0.65rem]">Suivi</th>
                    <th className="text-right p-4 soft-label text-orose-500/80 text-[0.65rem]">Total</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const statusInfo = STATUS_LABELS[order.status] ?? STATUS_LABELS.pending;
                    return (
                      <tr key={order.id} className="border-b border-peche-50 hover:bg-creme/30 transition-colors">
                        <td className="p-4 font-serif text-terre">{order.id.slice(0, 8).toUpperCase()}</td>
                        <td className="p-4 text-terre/70 text-sm">{formatDate(order.created_at)}</td>
                        <td className="p-4">
                          <div className="text-terre text-sm">{order.customer_name ?? '—'}</div>
                          <div className="text-terre/50 text-xs">{order.customer_email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`soft-label px-3 py-1 rounded-pill text-[0.6rem] ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="p-4 text-terre/60 text-xs">{order.tracking_number ?? '—'}</td>
                        <td className="p-4 text-right font-serif text-terre">{formatPrice(order.amount_total)}</td>
                        <td className="p-4 text-right">
                          <Link href={`/admin/commandes/${order.id}`} className="inline-flex items-center text-orose-500 transition-all hover:translate-x-1">
                            <ChevronRight size={18} strokeWidth={1.5} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createServiceRoleSupabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminOrderForm from '@/components/admin/AdminOrderForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) ?? '';
  if (role !== 'admin') redirect('/');

  const supabase = createServiceRoleSupabase();

  const { data: orderData } = await supabase
  .from('orders')
  .select('*')
  .eq('id', id)
  .single();

const order = orderData as any;

  if (!order) notFound();

  const { data: itemsData } = await supabase
  .from('order_items')
  .select('*')
  .eq('order_id', id);

const items = itemsData as any[];

  const address = order.shipping_address as {
    line1?: string; line2?: string; postal_code?: string; city?: string; country?: string;
  } | null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 soft-label text-terre/50 mb-8 text-[0.65rem]">
            <Link href="/admin/commandes" className="hover:text-orose-500 transition-colors">Admin</Link>
            <span>/</span>
            <span className="text-orose-500">N° {order.id.slice(0, 8).toUpperCase()}</span>
          </nav>

          <h1 className="font-serif text-4xl text-terre italic mb-8">
            Commande N° {order.id.slice(0, 8).toUpperCase()}
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-pur rounded-cloud p-8 border-soft shadow-soft">
                <h2 className="font-serif text-2xl text-terre italic mb-6">Articles</h2>
                <div className="space-y-3">
                  {items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-3 border-b border-peche-50 last:border-0">
                      <div>
                        <div className="font-serif text-terre">{item.product_name}</div>
                        {item.selected_color && (
                          <div className="text-xs text-terre/60 mt-1">Coloris : {item.selected_color}</div>
                        )}
                        <div className="text-xs text-terre/60">Qte : {item.quantity}</div>
                      </div>
                      <div className="font-serif text-terre">{formatPrice(item.total_price)}</div>
                    </div>
                  ))}
                  <div className="pt-3 mt-3 border-t border-peche-100 flex justify-between">
                    <div className="font-serif text-lg text-terre">Total</div>
                    <div className="font-serif text-lg text-terre">{formatPrice(order.amount_total)}</div>
                  </div>
                </div>
              </section>

              <section className="bg-pur rounded-cloud p-8 border-soft shadow-soft">
                <h2 className="font-serif text-2xl text-terre italic mb-6">Client et Livraison</h2>
                <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="soft-label text-orose-500/70 text-[0.6rem] mb-1">Email</dt>
                    <dd className="text-terre">{order.customer_email}</dd>
                  </div>
                  <div>
                    <dt className="soft-label text-orose-500/70 text-[0.6rem] mb-1">Nom</dt>
                    <dd className="text-terre">{order.customer_name ?? '-'}</dd>
                  </div>
                  {address && (
                    <div className="sm:col-span-2">
                      <dt className="soft-label text-orose-500/70 text-[0.6rem] mb-1">Adresse de livraison</dt>
                      <dd className="text-terre/80 leading-relaxed">
                        {address.line1 && <div>{address.line1}</div>}
                        {address.line2 && <div>{address.line2}</div>}
                        {(address.postal_code || address.city) && (
                          <div>{address.postal_code} {address.city}</div>
                        )}
                        {address.country && <div>{address.country}</div>}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            </div>

            <div>
              <AdminOrderForm
                orderId={order.id}
                initialStatus={order.status}
                initialCarrier={order.tracking_carrier ?? ''}
                initialNumber={order.tracking_number ?? ''}
                initialUrl={order.tracking_url ?? ''}
                initialNotes={order.admin_notes ?? ''}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

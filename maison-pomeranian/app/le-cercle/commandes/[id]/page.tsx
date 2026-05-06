import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Package, MapPin, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { createServiceRoleSupabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

interface Props {
  params: Promise<{ id: string }>;
}

const STATUS_STEPS = [
  { key: 'paid', label: 'Payée' },
  { key: 'preparing', label: 'En préparation' },
  { key: 'shipped', label: 'Expédiée' },
  { key: 'delivered', label: 'Livrée' },
];

function getStepIndex(status: string): number {
  return STATUS_STEPS.findIndex((s) => s.key === status);
}

function formatOrderDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function CommandeDetailPage({ params }: Props) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const supabase = createServiceRoleSupabase();

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (!order) notFound();

  const { data: items } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', id);

  const currentStep = getStepIndex(order.status);
  const isCancelled = order.status === 'cancelled' || order.status === 'refunded';
  const address = order.shipping_address as {
    line1?: string;
    line2?: string;
    postal_code?: string;
    city?: string;
    country?: string;
  } | null;

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 soft-label text-terre/50 mb-10 text-[0.65rem] flex-wrap">
            <Link href="/le-cercle" className="transition-all duration-500 ease-in-out hover:text-orose-500">Le Cercle</Link>
            <span>/</span>
            <Link href="/le-cercle/commandes" className="transition-all duration-500 ease-in-out hover:text-orose-500">Mes commandes</Link>
            <span>/</span>
            <span className="text-orose-500">N° {order.id.slice(0, 8).toUpperCase()}</span>
          </nav>

          <div className="mb-12">
            <div className="soft-label text-orose-500/70 text-[0.65rem] mb-2">Commande du {formatOrderDate(order.created_at)}</div>
            <h1 className="font-serif text-4xl lg:text-5xl text-terre leading-tight italic">N° {order.id.slice(0, 8).toUpperCase()}</h1>
          </div>

          {!isCancelled && currentStep >= 0 && (
            <section className="bg-pur rounded-cloud p-8 lg:p-10 border-soft shadow-soft mb-8">
              <h2 className="font-serif text-2xl text-terre italic mb-8">Suivi de la livraison</h2>
              <div className="relative">
                <div className="absolute top-5 left-5 right-5 h-px bg-peche-200" />
                <div className="absolute top-5 left-5 h-px bg-orose-400 transition-all duration-1000" style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }} />
                <div className="relative grid grid-cols-4 gap-2">
                  {STATUS_STEPS.map((step, i) => {
                    const isActive = i <= currentStep;
                    const isCurrent = i === currentStep;
                    return (
                      <div key={step.key} className="text-center">
                        <div className={`mx-auto h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? (isCurrent ? 'bg-peche-400 ring-4 ring-peche-200 shadow-glow' : 'bg-orose-400') : 'bg-pur border-2 border-peche-200'}`}>
                          <span className={`text-xs font-medium ${isActive ? 'text-pur' : 'text-terre/40'}`}>{i + 1}</span>
                        </div>
                        <div className={`soft-label text-[0.6rem] mt-3 ${isActive ? 'text-terre' : 'text-terre/40'}`}>{step.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {order.tracking_number && (
                <div className="mt-8 pt-6 border-t border-peche-100 text-center">
                  <div className="soft-label text-orose-500/70 text-[0.65rem] mb-2">Numéro de suivi {order.tracking_carrier ?? ''}</div>
                  <div className="font-serif text-xl text-terre italic">{order.tracking_number}</div>
                  {order.tracking_url && (
                    <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 soft-label text-orose-500 transition-all duration-500 ease-in-out hover:gap-3">
                      Suivre le colis <ExternalLink size={12} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              )}
            </section>
          )}

          {isCancelled && (
            <section className="bg-pur rounded-cloud p-10 border-soft shadow-soft mb-8 text-center">
              <p className="font-serif text-2xl text-terre/70 italic">Cette commande a été {order.status === 'cancelled' ? 'annulée' : 'remboursée'}.</p>
            </section>
          )}

          <section className="bg-pur rounded-cloud p-8 lg:p-10 border-soft shadow-soft mb-8">
            <h2 className="font-serif text-2xl text-terre italic mb-6">Vos articles</h2>
            <div className="space-y-4">
              {items?.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-peche-100 last:border-0 last:pb-0">
                  <div className="relative h-20 w-16 flex-shrink-0 bg-sable rounded-soft overflow-hidden border-soft">
                    {item.product_image && (<Image src={item.product_image} alt={item.product_name} fill sizes="80px" className="object-cover" />)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-lg text-terre">{item.product_name}</div>
                    {item.selected_color && (<div className="soft-label text-orose-500/70 text-[0.6rem] mt-1">Coloris : {item.selected_color}</div>)}
                    <div className="text-sm text-terre/60 mt-1">Quantité : {item.quantity}</div>
                  </div>
                  <div className="font-serif text-lg text-terre whitespace-nowrap">{formatPrice(item.total_price)}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            {address && (
              <section className="bg-pur rounded-cloud p-8 border-soft shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} strokeWidth={1.5} className="text-orose-500" />
                  <h3 className="soft-label text-orose-500">Adresse de livraison</h3>
                </div>
                <div className="text-terre/80 leading-relaxed">
                  {order.customer_name && <div>{order.customer_name}</div>}
                  {address.line1 && <div>{address.line1}</div>}
                  {address.line2 && <div>{address.line2}</div>}
                  {(address.postal_code || address.city) && (<div>{address.postal_code} {address.city}</div>)}
                  {address.country && <div>{address.country}</div>}
                </div>
              </section>
            )}
            <section className="bg-pur rounded-cloud p-8 border-soft shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Package size={16} strokeWidth={1.5} className="text-orose-500" />
                <h3 className="soft-label text-orose-500">Récapitulatif</h3>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-terre/60">Sous-total</dt><dd className="text-terre">{formatPrice(order.amount_subtotal ?? 0)}</dd></div>
                <div className="flex justify-between"><dt className="text-terre/60">Livraison</dt><dd className="text-terre">{order.amount_shipping === 0 ? 'Offerte' : formatPrice(order.amount_shipping)}</dd></div>
                <div className="flex justify-between pt-3 mt-3 border-t border-peche-100"><dt className="font-serif text-lg text-terre">Total</dt><dd className="font-serif text-lg text-terre">{formatPrice(order.amount_total)}</dd></div>
              </dl>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link href="/le-cercle/commandes" className="inline-flex items-center gap-2 soft-label text-terre/70 transition-all duration-500 ease-in-out hover:text-orose-500">← Toutes mes commandes</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

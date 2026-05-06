'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import type { CheckoutResponse, CheckoutErrorResponse } from '@/types';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function CartDrawer() {
  const { isOpen, close, items, removeItem, updateQuantity, total } =
    useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data: CheckoutResponse | CheckoutErrorResponse = await res.json();
      if (!res.ok || 'error' in data) {
        throw new Error('error' in data ? data.error : 'Erreur Stripe');
      }
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-terre/30 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] flex flex-col glass-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
          >
            <header className="flex items-center justify-between p-6 border-b border-peche-200/50 shrink-0">
              <div>
                <div className="soft-label text-orose-500">Le Panier</div>
                <div className="font-serif text-2xl text-terre mt-1 italic">
                  {items.length === 0
                    ? 'Votre sélection'
                    : `${items.length} pièce${items.length > 1 ? 's' : ''}`}
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Fermer le panier"
                className="p-2 text-terre rounded-full transition-all duration-500 ease-in-out hover:text-orose-500 hover:bg-peche-50"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4">🐾</div>
                  <p className="font-serif text-2xl text-terre/80 italic max-w-xs">
                    Votre panier vous attend.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 soft-label text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
                  >
                    Découvrir les Collections →
                  </button>
                </div>
              ) : (
                <ul className="space-y-6 py-2">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="flex gap-4"
                      >
                        <div className="relative h-24 w-20 flex-shrink-0 bg-pur rounded-soft overflow-hidden border-soft">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-base text-terre truncate">
                            {item.name}
                          </div>
                          <div className="text-sm text-terre/60 mt-1">
                            {formatPrice(item.price)}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center bg-pur rounded-pill border-soft">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="Diminuer la quantité"
                                className="p-2 pl-3 text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
                              >
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="px-3 text-xs">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="Augmenter la quantité"
                                className="p-2 pr-3 text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
                              >
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Retirer du panier"
                              className="p-2 text-terre/40 rounded-full transition-all duration-500 ease-in-out hover:text-orose-500 hover:bg-peche-50"
                            >
                              <Trash2 size={14} strokeWidth={1.25} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="p-6 border-t border-peche-200/50 space-y-5 shrink-0">
                <div className="flex justify-between items-baseline">
                  <span className="soft-label text-terre/60">Sous-total</span>
                  <span className="font-serif text-2xl text-terre">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-xs text-terre/50 leading-relaxed">
                  Livraison &amp; taxes calculées à l&apos;étape suivante.
                  Expédition douce sous 48h.
                </p>

                {error && (
                  <div className="text-xs text-red-700 bg-red-50/70 p-3 rounded-soft">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="soft-label">
                    {loading ? 'Préparation…' : 'Finaliser la commande'}
                  </span>
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}


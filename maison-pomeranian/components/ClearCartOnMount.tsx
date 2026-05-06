'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store';

/**
 * Composant invisible qui vide le panier dès qu'il est monté.
 * À utiliser sur la page de confirmation de commande après un checkout Stripe réussi.
 */
export default function ClearCartOnMount() {
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}

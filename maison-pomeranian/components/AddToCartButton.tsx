'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Check } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store';

interface Props {
  product: Product;
  selectedColorIndex?: number;
}

export default function AddToCartButton({ product, selectedColorIndex = 0 }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedColor = product.colors?.[selectedColorIndex] || null;

  // Première image du coloris choisi, ou la première image générale du produit
  const cartImage = selectedColor?.images?.[0] || product.images[0];

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: cartImage,
        stripePriceId: product.stripePriceId,
        selectedColor: selectedColor?.name,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (!product.inStock) {
    return (
      <button disabled className="w-full py-4 bg-sable text-terre/50 rounded-pill cursor-not-allowed">
        <span className="soft-label">Bientôt de retour</span>
      </button>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="inline-flex items-center bg-pur rounded-pill border-soft">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          aria-label="Diminuer"
          className="p-3 pl-4 text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span className="px-4 font-serif text-lg text-terre min-w-[2rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          aria-label="Augmenter"
          className="p-3 pr-4 text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="flex-1 py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2"
            >
              <Check size={16} strokeWidth={2} />
              <span className="soft-label">Ajouté au panier</span>
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="soft-label block"
            >
              Ajouter au panier
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
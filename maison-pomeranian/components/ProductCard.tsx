'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Image principale : 1ère image du coloris choisi, sinon 1ère image du produit
  const currentImage =
    product.colors && product.colors[selectedColorIndex]?.images?.[0]
      ? product.colors[selectedColorIndex].images![0]
      : product.images[0];

  // Image au survol : 2e image du coloris choisi (si elle existe), sinon 2e image générale
  const hoverImage =
    product.colors && product.colors[selectedColorIndex]?.images?.[1]
      ? product.colors[selectedColorIndex].images![1]
      : product.images[1];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: currentImage,
      stripePriceId: product.stripePriceId,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-cloud bg-sable transition-all duration-500 ease-in-out group-hover:shadow-warm">
          {currentImage && (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.04]"
            />
          )}

          {hoverImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"
            />
          )}

          {product.tag && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-pur/90 backdrop-blur-sm rounded-pill soft-label text-orose-500 shadow-soft">
              {product.tag}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            aria-label={`Ajouter ${product.name} au panier`}
            className="absolute bottom-4 right-4 z-10 h-12 w-12 flex items-center justify-center bg-peche-400 text-pur rounded-full opacity-0 translate-y-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 hover:bg-peche-500 hover:shadow-glow"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 z-10 bg-creme/70 backdrop-blur-xs flex items-center justify-center">
              <span className="soft-label text-terre/80 bg-pur px-4 py-2 rounded-pill shadow-soft">
                Bientôt de retour
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 px-2">
          {product.collection && (
            <div className="soft-label text-orose-500/70 text-[0.65rem]">
              {product.collection}
            </div>
          )}
          <h3 className="font-serif text-xl text-terre transition-all duration-500 ease-in-out group-hover:text-orose-500">
            {product.name}
          </h3>
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-terre">
              {formatPrice(product.price)}
            </span>
            {product.spec && (
              <span className="text-xs text-terre/40 italic">
                {product.spec}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Pastilles EN DEHORS du Link */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex gap-1.5 pt-2 px-2">
          {product.colors.map((color, index) => (
            <button
              key={color.name}
              onClick={() => setSelectedColorIndex(index)}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                selectedColorIndex === index
                  ? 'border-terre scale-110'
                  : 'border-black/10 hover:border-terre/50'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      )}
    </motion.article>
  );
}
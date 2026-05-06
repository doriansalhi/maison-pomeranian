'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  alt: string;
  tag?: string;
}

export default function ProductGallery({ images, alt, tag }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative aspect-[4/5] rounded-cloud overflow-hidden bg-sable shadow-warm">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[selectedIdx]}
              alt={alt}
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {tag && (
          <div className="absolute top-6 left-6 z-10 bg-pur/90 backdrop-blur-sm rounded-pill px-4 py-2 soft-label text-orose-500 shadow-soft">
            {tag}
          </div>
        )}
      </div>

      {/* Miniatures cliquables */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIdx(i)}
              aria-label={`Voir image ${i + 1}`}
              className={`relative aspect-square rounded-soft overflow-hidden bg-sable transition-all duration-500 ease-in-out ${
                selectedIdx === i
                  ? 'ring-2 ring-peche-400 ring-offset-2 ring-offset-creme'
                  : 'border-soft hover:opacity-80'
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                quality={85}
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
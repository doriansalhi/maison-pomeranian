'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AddToCartButton from '@/components/AddToCartButton';
import { getProductBySlug } from '@/lib/products';
import { COLLECTIONS } from '@/lib/collections';
import { formatPrice } from '@/lib/utils';
import { use } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Quand on change de coloris, on revient à la 1ère image de ce coloris
  useEffect(() => {
    setSelectedImageIdx(0);
  }, [selectedColorIndex]);

  if (!product) {
    notFound();
  }

  // Liste d'images à afficher : celles du coloris choisi si dispo, sinon celles du produit
  const galleryImages =
    product.colors && product.colors[selectedColorIndex]?.images
      ? product.colors[selectedColorIndex].images!
      : product.images;

  const currentImage = galleryImages[selectedImageIdx] ?? galleryImages[0];

  const collection = COLLECTIONS.find((c) => c.slug === product.collectionSlug);

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 soft-label text-terre/50 mb-10 text-[0.65rem]">
            <Link href="/" className="transition-all duration-500 ease-in-out hover:text-orose-500">
              Accueil
            </Link>
            <span>/</span>
            <Link href={`/collections/${product.collectionSlug}`} className="transition-all duration-500 ease-in-out hover:text-orose-500">
              {product.collection}
            </Link>
            <span>/</span>
            <span className="text-orose-500">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Galerie */}
            <ScrollReveal>
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-cloud overflow-hidden bg-sable shadow-warm border-soft">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      {currentImage && (
                        <Image
                          src={currentImage}
                          alt={product.name}
                          fill
                          priority
                          quality={95}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {product.tag && (
                    <div className="absolute top-6 left-6 z-10 bg-pur/90 backdrop-blur-sm rounded-pill px-4 py-2 soft-label text-orose-500 shadow-soft">
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Miniatures cliquables */}
                {galleryImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {galleryImages.slice(0, 4).map((img, i) => (
                      <button
                        key={`${img}-${i}`}
                        onClick={() => setSelectedImageIdx(i)}
                        aria-label={`Voir image ${i + 1}`}
                        className={`relative aspect-square rounded-soft overflow-hidden bg-sable transition-all duration-500 ease-in-out ${
                          selectedImageIdx === i
                            ? 'ring-2 ring-peche-400 ring-offset-2 ring-offset-creme'
                            : 'border-soft hover:opacity-80'
                        }`}
                      >
                        <Image src={img} alt="" fill quality={85} sizes="120px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Info produit */}
            <ScrollReveal delay={0.15}>
              <div className="lg:sticky lg:top-32 space-y-8">
                {collection && (
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="inline-flex items-center gap-2 soft-label text-orose-500 transition-all duration-500 ease-in-out hover:gap-3"
                  >
                    <span className="h-px w-8 bg-orose-400" />
                    {collection.name}
                  </Link>
                )}

                <h1 className="font-serif text-4xl lg:text-5xl text-terre leading-tight text-balance">
                  {product.name}
                </h1>

                <div className="font-serif text-3xl text-terre">
                  {formatPrice(product.price)}
                </div>

                <p className="text-terre/70 leading-relaxed text-lg">
                  {product.description}
                </p>

                {product.spec && (
                  <div className="inline-flex flex-wrap gap-3">
                    <span className="soft-label px-4 py-2 bg-pur rounded-pill text-terre/70 border-soft">
                      ✦ {product.spec}
                    </span>
                    <span className="soft-label px-4 py-2 bg-pur rounded-pill text-terre/70 border-soft">
                      ✦ Made in France
                    </span>
                  </div>
                )}

                {/* Sélecteur de couleurs */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <span className="soft-label text-[0.65rem] text-terre/50 uppercase tracking-widest">
                      Coloris : <span className="text-terre">{product.colors[selectedColorIndex].name}</span>
                    </span>
                    <div className="flex gap-3">
                      {product.colors.map((color, index) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColorIndex(index)}
                          className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                            selectedColorIndex === index
                              ? 'border-orose-400 scale-110 shadow-sm'
                              : 'border-transparent hover:border-orose-200'
                          }`}
                          title={color.name}
                        >
                          <div
                            className="absolute inset-0.5 rounded-full border border-black/5"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <AddToCartButton product={product} selectedColorIndex={selectedColorIndex} />
                </div>

                <div className="pt-6 space-y-3 text-sm text-terre/60">
                  <div className="flex items-center gap-3">
                    <span className="text-orose-500">✦</span>
                    <span>Expédition douce sous 48h en France</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orose-500">✦</span>
                    <span>Retours gratuits sous 30 jours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orose-500">✦</span>
                    <span>Emballage tendre & éco-responsable</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
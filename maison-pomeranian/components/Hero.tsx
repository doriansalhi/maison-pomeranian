'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HERO_IMAGE = 'https://res.cloudinary.com/dci5mreqo/image/upload/v1777379578/Elixire_sw9ks3.png';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden bg-creme">
      <div className="absolute inset-0 bg-gradient-warm-glow pointer-events-none" />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(244,200,192,0.6) 0%, rgba(245,230,211,0.2) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245,183,154,0.5) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center w-full">
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-3"
          >
            <span className="h-px w-12 bg-orose-400" />
            <span className="soft-label text-orose-500">Collection 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="font-serif text-5xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-tight text-terre text-balance"
          >
            L&apos;Art de Vivre{' '}
            <em className="text-orose-500 not-italic font-light italic">
              à la française
            </em>
            <span className="block text-2xl lg:text-3xl xl:text-4xl mt-6 font-light text-terre/70 leading-snug italic">
              Pour votre Pomeranian
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-xl text-terre/70 leading-relaxed text-base lg:text-lg"
          >
            Deux collections d&apos;exception, pensées entre le sable de
            Pampelonne et nos ateliers, pour le Spitz nain qui mérite tendresse,
            douceur et élégance au quotidien.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/collections"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
            >
              <span className="soft-label">Découvrir les Collections</span>
              <span className="transition-all duration-500 ease-in-out group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/heritage"
              className="inline-flex items-center gap-3 px-8 py-4 border-soft border-soft-hover text-terre rounded-pill transition-all duration-500 ease-in-out hover:text-orose-500 bg-pur/50"
            >
              <span className="soft-label">Notre histoire</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="lg:col-span-5 relative aspect-[4/5] hidden lg:block"
        >
          {/* Halo derrière l'image */}
          <div className="absolute -inset-8 bg-gradient-sunset rounded-cloud blur-3xl opacity-50" />

          {/* Bulle "Fait avec amour" — en haut à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute -left-6 top-10 z-10 bg-pur/90 backdrop-blur-md rounded-soft p-5 shadow-soft animate-float-soft"
          >
            <div className="soft-label text-orose-500 text-[0.65rem]">
              Fait avec amour
            </div>
            <div className="font-serif text-xl text-terre mt-1 italic">
              à Saint-Tropez
            </div>
          </motion.div>

          <div
  className="relative h-full w-full rounded-cloud overflow-hidden"
  style={{
    boxShadow:
      '0 0 0 0.5px rgba(197,160,89,0.4), 0 40px 100px -20px rgba(0,0,0,0.6)',
  }}
>
            <Image
              src={HERO_IMAGE}
              alt="Poméranie — Maison Pomeranian"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
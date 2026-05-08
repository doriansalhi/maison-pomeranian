'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';

const NAV_LINKS = [
  { label: 'Collections', href: '/collections' },
  { label: 'Notre histoire', href: '/heritage' },
  { label: 'Le Cercle', href: '/le-cercle' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.open);

  return (
    <>
      {/* ── Bannière Fondateurs ──────────────────────────────── */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 inset-x-0 z-[60] bg-terre text-pur overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <span className="soft-label text-[0.65rem] text-pur/80">
                  -15% jusqu'au 1er Juin avec le code MAI ✦
                </span>
              </div>
              <button
                onClick={() => setBannerVisible(false)}
                className="shrink-0 text-pur/60 hover:text-pur transition-colors"
                aria-label="Fermer"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed inset-x-0 z-50 glass transition-all duration-500 ease-in-out ${
          scrolled ? 'shadow-soft' : ''
        } ${bannerVisible ? 'top-9' : 'top-0'}`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="group shrink-0" onClick={() => setMobileOpen(false)}>
            <span className="font-serif text-xl lg:text-2xl tracking-wide text-terre transition-all duration-500 ease-in-out group-hover:text-orose-500">
              Maison Pomeranian
            </span>
            <span className="block soft-label text-peche-600/70 mt-0.5 text-[0.6rem]">
              Saint-Tropez
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="soft-label text-terre/80 transition-all duration-500 ease-in-out hover:text-orose-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 shrink-0">
            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden md:inline-flex soft-label text-terre/80 transition-all duration-500 ease-in-out hover:text-orose-500"
              >
                Connexion
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-8 w-8 ring-1 ring-peche-300/50',
                  },
                }}
              />
            </SignedIn>

            <button
              onClick={openCart}
              aria-label={`Panier (${itemCount} article${itemCount > 1 ? 's' : ''})`}
              className="relative p-2 text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center text-[10px] bg-peche-400 text-pur rounded-full font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="lg:hidden p-2 text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-x-0 z-40 bg-creme/95 backdrop-blur-md border-b border-peche-100 shadow-warm lg:hidden ${
              bannerVisible ? 'top-[116px]' : 'top-20'
            }`}
          >
            <ul className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl text-terre italic transition-all duration-500 ease-in-out hover:text-orose-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-peche-100">
                <SignedOut>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="soft-label text-terre/70 transition-all duration-500 ease-in-out hover:text-orose-500"
                  >
                    Connexion
                  </Link>
                </SignedOut>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
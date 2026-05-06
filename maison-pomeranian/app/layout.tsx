import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maison-pomeranian.com'),
  title: {
    default: "Maison Pomeranian — Avec amour pour votre Spitz",
    template: '%s · Maison Pomeranian',
  },
  description:
    "Boutique tendresse pour Pomeranians. Deux collections d'exception, conçues avec amour à Saint-Tropez.",
  openGraph: {
    title: "Maison Pomeranian — Avec amour pour votre Spitz",
    description:
      "Boutique tendresse pour Pomeranians. Saint-Tropez.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Maison Pomeranian',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#F5B79A',
          colorBackground: '#FFF9F2',
          colorText: '#3D2817',
          colorTextSecondary: 'rgba(61,40,23,0.6)',
          fontFamily: 'var(--font-inter)',
          borderRadius: '12px',
        },
        elements: {
          card: 'shadow-soft',
          formButtonPrimary:
            'bg-peche-400 hover:bg-peche-500 transition-all duration-500 ease-in-out',
        },
      }}
    >
      <html
        lang="fr"
        className={`${cormorant.variable} ${inter.variable}`}
      >
        <body className="bg-creme text-terre antialiased font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';

const EXPERTISE_IMAGE = 'https://res.cloudinary.com/dci5mreqo/image/upload/v1777379578/Elixire_sw9ks3.png';

const STATS = [
  ['99%', 'de produits naturels'],
  ['100 %', 'Made in France'],
  ['2026', 'Lab Saint-Tropez'],
] as const;

export default function ExpertiseSection() {
  return (
    <section className="py-24 lg:py-40 bg-marine text-ivoire relative overflow-hidden">
      {/* Trame technique fond marine */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* ── Photo ───────────────────────────────── */}
        <ScrollReveal>
          <div className="relative">
            {/* Halo doré derrière l'image */}
            <div className="absolute -inset-8 bg-gradient-sunset rounded-cloud blur-3xl opacity-40" />

            <div
              className="aspect-[4/5] relative overflow-hidden rounded-cloud"
              style={{
                boxShadow:
                  '0 0 0 0.5px rgba(197,160,89,0.4), 0 40px 100px -20px rgba(0,0,0,0.6)',
              }}
            >
              <Image
                src={EXPERTISE_IMAGE}
                alt="Spitz nain — Maison Pomeranian"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-6 left-6 bg-ivoire/10 backdrop-blur-md border-hairline-gold px-4 py-2">
                <div className="tech-label text-or-400">Collection</div>
                <div className="font-serif text-sm text-ivoire/80 mt-0.5 italic">
                  Saint-Tropez, été 2025
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Storytelling ─────────────────────────────────── */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-or-400" />
              <span className="tech-label text-or-400">Héritage &amp; Lab</span>
            </div>

            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.1] text-balance">
              D&apos;un amour pour le Spitz{' '}
              <em className="text-or-400 not-italic font-light">
                à une obsession textile.
              </em>
            </h2>

            <div className="space-y-6 text-ivoire/70 leading-relaxed">
              <p>
                Maison Pomeranian est née d&apos;une rencontre, celle d&apos;un
                Spitz nain nommé Daysi{' '}
                et d&apos;années de recherche en ingénierie textile sur la Côte
                d&apos;Azur.
              </p>
              <p>
                Chaque produit est conçu, testé et tissé dans notre Lab Riviera,
                où nous mesurons la conductivité thermique des fibres, la
                résistance à la mâchoire, et l&apos;efficacité du brossage sur
                sous-poil dense. Le luxe, ici, est une science.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-ivoire/15">
              {STATS.map(([value, label]) => (
                <div key={label}>
                  <div className="font-mono text-2xl text-or-400">{value}</div>
                  <div className="tech-label text-ivoire/50 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
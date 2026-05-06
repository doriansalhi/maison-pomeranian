'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { COLLECTIONS } from '@/lib/collections';

export default function CollectionsGrid() {
  return (
    <section className="py-24 lg:py-40 bg-creme relative overflow-hidden">
      {/* Lueur chaude diffuse */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(245,183,154,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* En-tête de section */}
        <ScrollReveal>
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-orose-400" />
              <span className="soft-label text-orose-500">
                Nos Collections
              </span>
              <span className="h-px w-12 bg-orose-400" />
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.1] text-terre text-balance">
              Deux univers,{' '}
              <em className="text-orose-500 not-italic font-light italic">
                un seul amour.
              </em>
            </h2>
            <p className="mt-6 text-terre/70 leading-relaxed max-w-xl mx-auto">
              Chaque collection est pensée pour accompagner votre Loulou avec
              tendresse, dans tous les moments précieux de la vie tropézienne.
            </p>
          </div>
        </ScrollReveal>

        {/* Grille des collections */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {COLLECTIONS.map((collection, i) => (
            <ScrollReveal key={collection.slug} delay={i * 0.1} y={32}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group block bg-pur rounded-cloud overflow-hidden transition-all duration-500 ease-in-out hover:shadow-warm hover:-translate-y-1 border-soft border-soft-hover"
              >
                {/* Visuel collection */}
                <div className="aspect-[4/3] relative bg-gradient-sunset overflow-hidden">
                  {collection.image ? (
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl transition-all duration-500 ease-in-out group-hover:scale-110">
                        {collection.icon}
                      </span>
                    </div>
                  )}

                  {/* Badge spec discret */}
                  <div className="absolute top-4 right-4 bg-pur/90 backdrop-blur-sm rounded-pill px-3 py-1 soft-label text-orose-500 text-[0.6rem] shadow-soft z-10">
                    {collection.spec}
                  </div>
                </div>

                {/* Texte */}
                <div className="p-10 lg:p-12">
                  <div className="soft-label text-orose-500 mb-3">
                    {collection.tagline}
                  </div>
                  <h3 className="font-serif text-3xl lg:text-4xl text-terre mb-5 transition-all duration-500 ease-in-out group-hover:text-orose-500">
                    {collection.name}
                  </h3>
                  <p className="text-terre/70 leading-relaxed mb-8">
                    {collection.description}
                  </p>
                  <div className="inline-flex items-center gap-2 soft-label text-terre transition-all duration-500 ease-in-out group-hover:text-orose-500">
                    <span>Explorer</span>
                    <span className="transition-all duration-500 ease-in-out group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
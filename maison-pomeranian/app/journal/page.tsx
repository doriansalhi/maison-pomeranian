import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { JOURNAL } from '@/lib/journal';
import { formatDateFR } from '@/lib/utils';

export const metadata = {
  title: 'Journal — Soins Pomeranian, Accessoires & Art de Vivre',
  description: 'Conseils soins Pomeranian, accessoires Spitz nain et art de vivre tropézien. Guides experts pour prendre soin de votre Loulou au quotidien.',
  openGraph: {
    title: 'Journal Maison Pomeranian — Soins & Accessoires Pomeranian',
    description: 'Conseils soins Pomeranian, accessoires Spitz nain et art de vivre tropézien. Guides experts pour prendre soin de votre Loulou au quotidien.',
    type: 'website',
    images: [
      {
        url: 'https://maison-pomeranian.com/og-journal.jpg',
        width: 1200,
        height: 630,
        alt: 'Journal Maison Pomeranian — Soins et Accessoires Pomeranian',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal Maison Pomeranian — Soins & Accessoires Pomeranian',
    description: 'Conseils soins Pomeranian, accessoires Spitz nain et art de vivre tropézien.',
  },
  keywords: [
    'soins Pomeranian',
    'accessoires Pomeranian',
    'Spitz nain',
    'pelage Pomeranian',
    'brossage Pomeranian',
    'entretien Spitz nain',
    'Pomeranian France',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Journal Maison Pomeranian',
  description: 'Conseils soins Pomeranian, accessoires Spitz nain et art de vivre tropézien.',
  url: 'https://maison-pomeranian.com/journal',
  publisher: {
    '@type': 'Organization',
    name: 'Maison Pomeranian',
    url: 'https://maison-pomeranian.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://maison-pomeranian.com/logo.png',
    },
  },
  blogPost: JOURNAL.map((article) => ({
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    url: `https://maison-pomeranian.com/journal/${article.slug}`,
    datePublished: article.date,
    image: article.image,
    author: {
      '@type': 'Organization',
      name: 'Maison Pomeranian',
    },
  })),
};

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL.slice().reverse();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24 relative overflow-hidden">
        <div
          className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(244,200,192,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">Le Journal</span>
                <span className="h-px w-12 bg-orose-400" />
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl text-terre leading-[1.05] text-balance">
                Histoires &amp;{' '}
                <em className="text-orose-500 not-italic font-light italic">
                  confidences.
                </em>
              </h1>
              <p className="mt-8 text-terre/70 leading-relaxed text-lg">
                Tout ce que nous aimons partager autour du <strong>Spitz nain</strong> :
                conseils <strong>soins Pomeranian</strong>, <strong>accessoires</strong> et art de vivre tropézien.
              </p>
            </div>
          </ScrollReveal>

          {featured && (
            <ScrollReveal>
              <Link href={`/journal/${featured.slug}`} className="group block mb-20">
                <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-pur rounded-cloud overflow-hidden border-soft border-soft-hover shadow-soft transition-all duration-500 ease-in-out hover:shadow-warm">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-sunset overflow-hidden min-h-[300px]">
                    {featured.image && featured.image.startsWith('http') ? (
                      <Image
                        src={featured.image}
                        alt={`${featured.title} — Soins et accessoires Pomeranian`}
                        fill
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-pur/50 text-9xl italic">✦</span>
                      </div>
                    )}
                    <div className="absolute top-6 left-6 bg-pur/90 backdrop-blur-sm rounded-pill px-4 py-2 soft-label text-orose-500 text-[0.65rem] z-10">
                      À la une
                    </div>
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4 soft-label text-orose-500/70 text-[0.65rem]">
                      <span>{featured.category}</span>
                      <span className="text-terre/30">·</span>
                      <span>{featured.readTime} de lecture</span>
                    </div>
                    <h2 className="font-serif text-3xl lg:text-4xl text-terre leading-tight mb-5 transition-all duration-500 ease-in-out group-hover:text-orose-500">
                      {featured.title}
                    </h2>
                    <p className="text-terre/70 leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 soft-label text-terre transition-all duration-500 ease-in-out group-hover:text-orose-500">
                      <span>Lire l&apos;article</span>
                      <span className="transition-all duration-500 ease-in-out group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {rest.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.1}>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <article>
                    <div className="relative aspect-[4/3] rounded-cloud overflow-hidden bg-gradient-sunset mb-6 transition-all duration-500 ease-in-out group-hover:shadow-warm">
                      {article.image && article.image.startsWith('http') ? (
                        <Image
                          src={article.image}
                          alt={`${article.title} — Maison Pomeranian`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-pur/50 text-7xl italic">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="px-2">
                      <div className="flex items-center gap-3 mb-3 soft-label text-orose-500/70 text-[0.65rem]">
                        <span>{article.category}</span>
                        <span className="text-terre/30">·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-terre leading-tight mb-3 transition-all duration-500 ease-in-out group-hover:text-orose-500">
                        {article.title}
                      </h3>
                      <p className="text-terre/60 leading-relaxed text-sm line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-terre/40 mt-4 italic">
                        {formatDateFR(article.date)}
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
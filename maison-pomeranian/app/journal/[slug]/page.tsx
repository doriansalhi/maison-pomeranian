import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { JOURNAL, getArticleBySlug } from '@/lib/journal';
import { formatDateFR } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article introuvable' };

  const ogUrl = `https://maison-pomeranian.com/api/og?type=journal&title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent(article.category)}`;
  const canonicalUrl = `https://maison-pomeranian.com/journal/${slug}`;

  return {
    title: `${article.title} | Maison Pomeranian`,
    description: article.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${article.title} — Maison Pomeranian`,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: 'Maison Pomeranian',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: article.date,
      authors: ['Maison Pomeranian'],
      images: [{ url: ogUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Maison Pomeranian`,
      description: article.excerpt,
      images: [ogUrl],
    },
  };
}

export function generateStaticParams() {
  return JOURNAL.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const suggestions = JOURNAL.filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: article.image,
      datePublished: article.date,
      author: {
        '@type': 'Organization',
        name: 'Maison Pomeranian',
        url: 'https://maison-pomeranian.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Maison Pomeranian',
        url: 'https://maison-pomeranian.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://maison-pomeranian.com/logo.png',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://maison-pomeranian.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Journal',
          item: 'https://maison-pomeranian.com/journal',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `https://maison-pomeranian.com/journal/${article.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 soft-label text-terre/50 mb-10 text-[0.65rem]">
            <Link href="/" className="transition-all duration-500 ease-in-out hover:text-orose-500">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/journal" className="transition-all duration-500 ease-in-out hover:text-orose-500">
              Journal
            </Link>
            <span>/</span>
            <span className="text-orose-500 truncate">{article.title}</span>
          </nav>

          <ScrollReveal>
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6 soft-label text-orose-500 text-[0.65rem]">
                <span>{article.category}</span>
                <span className="text-terre/30">·</span>
                <span>{article.readTime} de lecture</span>
                <span className="text-terre/30">·</span>
                <time dateTime={article.date} className="italic font-serif normal-case tracking-normal">
                  {formatDateFR(article.date)}
                </time>
              </div>
              <h1 className="font-serif text-4xl lg:text-6xl text-terre leading-[1.1] text-balance">
                {article.title}
              </h1>
              <p className="mt-6 text-terre/70 leading-relaxed text-lg italic">
                {article.excerpt}
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative aspect-[16/9] rounded-cloud overflow-hidden bg-gradient-sunset shadow-warm mb-16">
              {article.image && article.image.startsWith('http') ? (
                <Image
                  src={article.image}
                  alt={`${article.title} — Maison Pomeranian`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-pur/50 text-9xl italic">✦</span>
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-6">
              {article.content.map((paragraph, i) => (
                <div
                  key={i}
                  className={`text-terre/80 leading-relaxed text-lg prose-headings:font-serif prose-headings:text-terre prose-a:text-orose-500 prose-a:underline ${i === 0 ? 'first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-orose-500' : ''}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-16 p-8 bg-pur rounded-cloud border-soft shadow-soft text-center">
              <p className="soft-label text-orose-500 mb-3">Nos collections</p>
              <p className="font-serif text-2xl text-terre italic mb-6">
                Découvrez nos pièces conçues avec amour
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-3 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
              >
                <span className="soft-label">Voir les collections</span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-16 pt-8 border-t border-peche-200/50 text-center">
              <div className="text-orose-500 text-2xl mb-3">✦ ✦ ✦</div>
              <p className="font-serif text-xl text-terre italic">
                Avec amour, la Maison Pomeranian
              </p>
            </div>
          </ScrollReveal>
        </article>

        {suggestions.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="h-px w-12 bg-orose-400" />
                  <span className="soft-label text-orose-500">À lire aussi</span>
                  <span className="h-px w-12 bg-orose-400" />
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl text-terre italic">
                  Continuer à lire
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {suggestions.map((s) => (
                  <Link key={s.slug} href={`/journal/${s.slug}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-cloud overflow-hidden bg-gradient-sunset mb-5 transition-all duration-500 ease-in-out group-hover:shadow-warm">
                      {s.image && s.image.startsWith('http') ? (
                        <Image
                          src={s.image}
                          alt={`${s.title} — Soins et accessoires Pomeranian`}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-pur/50 text-6xl italic">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="soft-label text-orose-500/70 mb-2 text-[0.6rem]">{s.category}</div>
                    <h3 className="font-serif text-xl text-terre leading-tight transition-all duration-500 ease-in-out group-hover:text-orose-500">
                      {s.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
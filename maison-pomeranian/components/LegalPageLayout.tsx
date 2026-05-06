import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { ReactNode } from 'react';

interface Props {
  label: string;
  title: string;
  titleAccent?: string;
  intro?: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  label,
  title,
  titleAccent,
  intro,
  children,
}: Props) {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-creme pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <header className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orose-400" />
                <span className="soft-label text-orose-500">{label}</span>
                <span className="h-px w-12 bg-orose-400" />
              </div>
              <h1 className="font-serif text-5xl lg:text-6xl text-terre leading-[1.05] text-balance">
                {title}{' '}
                {titleAccent && (
                  <em className="text-orose-500 not-italic font-light italic">
                    {titleAccent}
                  </em>
                )}
              </h1>
              {intro && (
                <p className="mt-6 text-terre/70 leading-relaxed text-lg">
                  {intro}
                </p>
              )}
            </header>
          </ScrollReveal>

          <ScrollReveal>
            <article className="bg-pur rounded-cloud p-8 lg:p-12 border-soft shadow-soft prose-terre">
              {children}
            </article>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

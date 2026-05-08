import Link from 'next/link';

const FOOTER_COLUMNS = [
  {
    title: 'Collections',
    links: [
      ['Soins & Cosmetiques', '/collections/soins-cosmetiques'],
      ["Art de vivre", '/collections/art-de-vivre'],
    ],
  },
  {
    title: 'Maison',
    links: [
      ['Notre histoire', '/heritage'],
      ['Le Cercle', '/le-cercle'],
      ['Journal', '/journal'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Service',
    links: [
      ['Livraison', '/livraison'],
      ['Retours', '/retours'],
      ['CGV', '/cgv'],
      ['Mentions légales', '/mentions'],
      ['FAQ', '/faq'],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-sable border-t border-peche-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="font-serif text-2xl text-terre">
              Maison Pomeranian
            </div>
            <div className="soft-label text-orose-500/70 mt-2 text-[0.65rem]">
              Saint-Tropez
            </div>
            <p className="text-terre/60 text-sm mt-6 leading-relaxed">
              Avec amour, pour les Pomeranians qui méritent ce qu&apos;il y a
              de plus doux.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="soft-label text-orose-500 mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-terre/70 text-sm transition-all duration-500 ease-in-out hover:text-orose-500"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-10 border-t border-peche-200/40 gap-4">
          <div className="soft-label text-terre/50 text-[0.65rem]">
            © 2026 Maison Pomeranian — Fait avec amour à Saint-Tropez
          </div>
          <div className="soft-label text-terre/50 text-[0.65rem]">
            ✦ ✦ ✦
          </div>
        </div>
      </div>
    </footer>
  );
}


import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type') ?? 'default'; // default | journal | collection
  const title = searchParams.get('title') ?? null;
  const subtitle = searchParams.get('subtitle') ?? null;

  const config = {
    default: {
      label: 'Accessoires & Soins',
      heading: title ?? 'Maison Pomeranian',
      sub: subtitle ?? 'Conçu avec amour à Saint-Tropez',
      accent: '#C8956C',
    },
    journal: {
      label: 'Le Journal',
      heading: title ?? 'Maison Pomeranian',
      sub: subtitle ?? 'Conseils & inspirations pour votre Pomeranian',
      accent: '#B07A5A',
    },
    collection: {
      label: 'Collection',
      heading: title ?? 'Maison Pomeranian',
      sub: subtitle ?? 'Pièces exclusives pour Spitz nain',
      accent: '#C8956C',
    },
  }[type] ?? {
    label: '',
    heading: title ?? 'Maison Pomeranian',
    sub: subtitle ?? '',
    accent: '#C8956C',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#FAF6F1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Cercle décoratif */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(244,200,192,0.35)',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '1px', background: config.accent }} />
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: config.accent,
            }}
          >
            {config.label}
          </span>
        </div>

        {/* Contenu central */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
          <h1
            style={{
              fontSize: title && title.length > 40 ? '52px' : '68px',
              color: '#3D2B1F',
              lineHeight: 1.05,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {config.heading}
          </h1>
          {config.sub && (
            <p
              style={{
                fontSize: '22px',
                color: 'rgba(61,43,31,0.6)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {config.sub}
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#3D2B1F',
              fontStyle: 'italic',
            }}
          >
            maison-pomeranian.com
          </span>
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: config.accent,
              border: `1px solid ${config.accent}`,
              padding: '6px 14px',
              borderRadius: '999px',
            }}
          >
            Spitz nain · France
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
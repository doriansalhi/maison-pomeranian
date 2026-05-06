import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Maison Pomeranian';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFF9F2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <div style={{ fontSize: 64, color: '#3D2817', fontFamily: 'serif' }}>
          Maison Pomeranian
        </div>
        <div style={{ fontSize: 28, color: '#B88080' }}>
          Avec amour pour votre Spitz · Saint-Tropez
        </div>
      </div>
    ),
    { ...size }
  );
}
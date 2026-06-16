import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = 'Familia Internacional - Estudio Jurídico de Derecho Internacional de Familia';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const BRAND_PRIMARY = '#07234c';
const BRAND_ACCENT = '#2d5070';

export default function RootOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BRAND_PRIMARY,
          color: '#f3f4f6',
          padding: 64,
          fontFamily: 'Arial, Helvetica, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 82% 16%, rgba(64,80,112,0.35), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.06), transparent 38%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          <span style={{ color: '#ffffff' }}>{siteConfig.name}</span>
          <div
            style={{
              border: '1px solid rgba(128,144,160,0.55)',
              borderRadius: 999,
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 700,
              padding: '10px 18px',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            Derecho Internacional de Familia
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div
            style={{
              width: 86,
              height: 4,
              background: '#ffffff',
              borderRadius: 999,
              marginBottom: 26,
            }}
          />
          <h1
            style={{
              margin: 0,
              color: '#ffffff',
              fontSize: 68,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            Primer estudio en Chile dedicado al Derecho Internacional de Familia
          </h1>
          <p
            style={{
              margin: '28px 0 0',
              color: '#d1d5db',
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            {siteConfig.metadata.description}
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            color: BRAND_ACCENT,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <span>Lo Barnechea, Santiago</span>
          <span>familiainternacional.cl</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

import { ImageResponse } from 'next/og';

export const alt = 'Familia Internacional - Estudio Jurídico de Derecho Internacional de Familia';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const BRAND_PRIMARY = '#07234c';
const BRAND_ACCENT = '#2d5070';

export default function Image() {
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
          color: '#f5f5f5',
          padding: 72,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(16,48,80,0.55), rgba(5,24,48,0.2) 34%, rgba(255,255,255,0.04))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -120,
            width: 420,
            height: 420,
            borderRadius: 420,
            background: 'rgba(64,80,112,0.28)',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: 1 }}>
              Familia Internacional
            </div>
            <div style={{ fontSize: 18, color: '#c0d0e0', letterSpacing: 5 }}>
              ESTUDIO JURÍDICO
            </div>
          </div>
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 999,
              padding: '14px 22px',
              color: '#f5f5f5',
              fontSize: 20,
            }}
          >
            Lo Barnechea, Santiago
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
            maxWidth: 880,
            position: 'relative',
          }}
        >
          <div
            style={{
              color: BRAND_ACCENT,
              fontSize: 22,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 5,
            }}
          >
            Derecho Internacional de Familia
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            Expertos en familia internacional.
          </div>
          <div
            style={{
              width: 96,
              height: 4,
              background: '#ffffff',
              borderRadius: 999,
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 36,
            color: '#d5d5d5',
            fontSize: 22,
            position: 'relative',
          }}
        >
          <span>Divorcios internacionales</span>
          <span>Sustracción de menores</span>
          <span>Exequátur</span>
          <span>Alimentos</span>
        </div>
      </div>
    ),
    size,
  );
}

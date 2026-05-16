import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NUMERA — Thần Số Học Cá Nhân';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a35 50%, #0d0d1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background stars (decorative dots) */}
        {[
          { top: '10%', left: '5%' }, { top: '20%', left: '90%' },
          { top: '60%', left: '8%' }, { top: '80%', left: '85%' },
          { top: '40%', left: '95%' }, { top: '75%', left: '15%' },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.4)',
              ...pos,
            }}
          />
        ))}

        {/* Eye icon (simplified SVG as div) */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2a1a60, #0d0d1a)',
            border: '3px solid rgba(245,158,11,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            boxShadow: '0 0 60px rgba(245,158,11,0.3)',
          }}
        >
          <div
            style={{
              fontSize: 48,
              color: '#f59e0b',
            }}
          >
            ✦
          </div>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#e2e8f0',
            letterSpacing: '0.25em',
            marginBottom: 16,
          }}
        >
          NUMERA
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            letterSpacing: '0.05em',
            marginBottom: 40,
          }}
        >
          Thần Số Học Cá Nhân
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 18,
            color: '#64748b',
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Khám phá số chủ đạo · Vận mệnh năm · Tương hợp
        </div>

        {/* Golden divider */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            width: 120,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}

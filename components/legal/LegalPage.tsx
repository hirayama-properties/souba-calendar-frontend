import Link from 'next/link';
import { PALETTE } from '@/lib/palette';

const C = PALETTE;

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: '16px', fontWeight: 700, color: C.textHi, margin: '28px 0 10px' }}>{children}</h2>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '13.5px', lineHeight: 1.9, color: C.textMid, margin: '0 0 14px' }}>{children}</p>;
}

export default function LegalPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fbfaf8',
        color: '#211e19',
        fontFamily: 'var(--font-noto-sans-jp), sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <header style={{ borderBottom: `1px solid ${C.border}`, background: 'rgba(251,250,248,.9)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', gap: '11px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg,#d8ae5b,#b07d2a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fffdf7',
                fontSize: '17px',
                flexShrink: 0,
              }}
            >
              相
            </div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, letterSpacing: '.03em' }}>相場カレンダー</div>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: C.textHi, margin: 0 }}>{title}</h1>
        {updated && <div style={{ fontSize: '12px', color: C.textLo, marginTop: '8px' }}>最終更新日：{updated}</div>}
        <div style={{ marginTop: '28px' }}>{children}</div>
      </main>
    </div>
  );
}

import { ImageResponse } from 'next/og';
import { PALETTE, TYPE_COLOR, TYPE_LABEL } from '@/lib/palette';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '相場カレンダー — 相場を動かすイベントを、ひと目で。';
// Fixed design, no request-time data — safe to bake into the static export.
export const dynamic = 'force-static';

// Same CDN source as backend/supabase/functions/_shared/pdf.ts uses for its
// PDF export font — fetched once per server lifetime, not bundled locally.
const FONT_BASE = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/SubsetOTF/JP';
let fontsPromise: Promise<{ bold: ArrayBuffer; regular: ArrayBuffer }> | null = null;

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetch(`${FONT_BASE}/NotoSansJP-Bold.otf`).then((r) => r.arrayBuffer()),
      fetch(`${FONT_BASE}/NotoSansJP-Regular.otf`).then((r) => r.arrayBuffer()),
    ]).then(([bold, regular]) => ({ bold, regular }));
  }
  return fontsPromise;
}

const COVERAGE: Array<keyof typeof TYPE_LABEL> = ['cb', 'econ', 'sq', 'div'];

export default async function OgImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PALETTE.bg,
          fontFamily: 'Noto Sans JP',
          position: 'relative',
          padding: '56px 68px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -140,
            right: -140,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${PALETTE.goldSoft}26, ${PALETTE.gold}0d)`,
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${PALETTE.goldSoft}, ${PALETTE.gold})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fffdf7',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            相
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 1, color: PALETTE.textHi }}>
              相場カレンダー
            </div>
            <div style={{ fontSize: 13, color: PALETTE.textLo, letterSpacing: 4 }}>MARKET CALENDAR</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: '#fbf3e0',
              border: '1px solid #ecd9ad',
              color: '#8a5a12',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: PALETTE.gold, display: 'flex' }} />
            日本株・米国株 投資家のためのカレンダー
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 58, fontWeight: 700, lineHeight: 1.35, color: PALETTE.textHi }}>
            <div style={{ display: 'flex' }}>相場を動かすイベントを、</div>
            <div style={{ display: 'flex' }}>ひと目で。</div>
          </div>

          <div style={{ display: 'flex', fontSize: 21, color: PALETTE.textMid, maxWidth: 880 }}>
            日米の政策会合・経済指標・SQ・配当の予定を、投資家のために1画面に。
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {COVERAGE.map((key) => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                borderRadius: 8,
                border: `1px solid ${PALETTE.borderL}`,
                background: '#fff',
                color: PALETTE.textHi,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLOR[key], display: 'flex' }} />
              {TYPE_LABEL[key]}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Noto Sans JP', data: fonts.bold, weight: 700, style: 'normal' },
        { name: 'Noto Sans JP', data: fonts.regular, weight: 400, style: 'normal' },
      ],
    },
  );
}

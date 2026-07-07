import Link from 'next/link';
import HeroAgendaCard from './HeroAgendaCard';
import { PALETTE, MONO_FONT } from '@/lib/palette';
import { LEGAL_LINKS, CONTACT_MAILTO } from '@/lib/legalLinks';

const C = PALETTE;

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: '13px',
        background: '#fff',
        padding: '24px 22px',
        boxShadow: '0 1px 2px rgba(40,33,20,.04)',
      }}
    >
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '11px',
          background: 'rgba(176,125,42,.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: '15.5px', fontWeight: 700, marginTop: '17px', color: C.textHi }}>{title}</div>
      <p style={{ fontSize: '12.5px', lineHeight: 1.8, color: C.textMid, margin: '9px 0 0' }}>{body}</p>
    </div>
  );
}

function CoverageItem({ color, title, body }: { color: string; title: string; body: string }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        padding: '20px',
        border: `1px solid ${C.border}`,
        borderRadius: '12px',
        background: '#fff',
      }}
    >
      <div style={{ width: '11px', height: '11px', borderRadius: '3px', background: color, flexShrink: 0, marginTop: '4px' }} />
      <div>
        <div style={{ fontSize: '14.5px', fontWeight: 700, color: C.textHi }}>{title}</div>
        <p style={{ fontSize: '12.5px', lineHeight: 1.75, color: C.textMid, margin: '7px 0 0' }}>{body}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: '12px', background: '#fff', padding: '20px 22px' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: C.textHi }}>{q}</div>
      <p style={{ fontSize: '12.5px', lineHeight: 1.8, color: C.textMid, margin: '9px 0 0' }}>{a}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fbfaf8',
        color: '#211e19',
        fontFamily: "var(--font-noto-sans-jp), sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'rgba(251,250,248,.86)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid #ebe6dd`,
        }}
      >
        <div
          style={{
            maxWidth: '1140px',
            margin: '0 auto',
            padding: '0 28px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
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
            <div>
              <div style={{ fontSize: '15.5px', fontWeight: 700, letterSpacing: '.03em', lineHeight: 1.2 }}>相場カレンダー</div>
              <div style={{ fontSize: '9px', color: C.textLo, letterSpacing: '.16em', marginTop: '1px' }}>MARKET CALENDAR</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '24px', marginLeft: '14px', flexWrap: 'wrap' }}>
            <a href="#features" style={{ fontSize: '13px', color: C.textMid, whiteSpace: 'nowrap' }}>機能</a>
            <a href="#coverage" style={{ fontSize: '13px', color: C.textMid, whiteSpace: 'nowrap' }}>収録イベント</a>
            <a href="#pricing" style={{ fontSize: '13px', color: C.textMid, whiteSpace: 'nowrap' }}>料金</a>
            <a href="#faq" style={{ fontSize: '13px', color: C.textMid, whiteSpace: 'nowrap' }}>よくある質問</a>
          </nav>
          <div style={{ flex: 1 }} />
          <Link
            href="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              height: '38px',
              color: C.textMid,
              fontWeight: 600,
              fontSize: '13px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ログイン
          </Link>
          <Link
            href="/calendar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '0 16px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
              color: '#2a1e08',
              fontWeight: 700,
              fontSize: '13px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            カレンダーを開く →
          </Link>
        </div>
      </header>

      <section
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '74px 28px 44px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '54px',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: '1 1 380px', minWidth: '300px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 13px',
              border: '1px solid #ecd9ad',
              background: '#fbf3e0',
              borderRadius: '999px',
              fontSize: '11.5px',
              color: C.gold,
              fontWeight: 700,
              letterSpacing: '.03em',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.gold }} />
            日本株・米国株 投資家のためのカレンダー
          </div>
          <h1
            style={{
              fontSize: '50px',
              lineHeight: 1.22,
              fontWeight: 700,
              letterSpacing: '.01em',
              margin: '22px 0 0',
              color: '#211e19',
            }}
          >
            相場を動かすイベントを、
            <br />
            ひと目で。
          </h1>
          <p style={{ fontSize: '15.5px', lineHeight: 1.85, color: C.textMid, margin: '20px 0 0', maxWidth: '482px' }}>
            FOMC・日銀会合・米雇用統計・CPI・SQ・配当の権利日まで。日米の重要スケジュールを
            <strong style={{ color: '#211e19', fontWeight: 700 }}>1つのカレンダー</strong>に集約。先回りして相場に備えられます。
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '30px' }}>
            <Link
              href="/calendar"
              style={{
                padding: '0 24px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '9px',
                background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
                color: '#2a1e08',
                fontWeight: 700,
                fontSize: '14.5px',
              }}
            >
              無料で使ってみる →
            </Link>
            <a
              href="#pricing"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 22px',
                height: '48px',
                border: '1px solid #ddd6ca',
                borderRadius: '9px',
                background: '#fff',
                color: C.textMid,
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              料金を見る
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '18px', fontSize: '12px', color: C.textLo }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: C.div }}>✓</span> クレジットカード不要
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: C.div }}>✓</span> 当月分は無料で利用可能
            </span>
          </div>
        </div>

        <HeroAgendaCard />
      </section>

      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: '#faf7f2' }}>
        <div
          style={{
            maxWidth: '1140px',
            margin: '0 auto',
            padding: '17px 28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '9px 16px',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '11px', color: C.textLo, letterSpacing: '.08em', marginRight: '4px' }}>収録イベント</span>
          {[
            ['FOMC', C.cb],
            ['日銀会合', C.cb],
            ['米雇用統計', C.econ],
            ['CPI', C.econ],
            ['GDP', C.econ],
            ['SQ算出日', C.sq],
            ['配当権利日', C.div],
            ['市場休場', C.holiday],
          ].map(([label, color]) => (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: C.textMid }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <section id="features" style={{ maxWidth: '1140px', margin: '0 auto', padding: '78px 28px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 46px' }}>
          <div style={{ fontFamily: MONO_FONT, fontSize: '11px', letterSpacing: '.22em', color: C.gold, fontWeight: 600 }}>
            FEATURES
          </div>
          <h2 style={{ fontSize: '31px', lineHeight: 1.45, fontWeight: 700, margin: '13px 0 0', color: '#211e19' }}>
            投資家が「見るべき」だけを、ていねいに。
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.85, color: C.textMid, margin: '14px 0 0' }}>
            ニュースの洪水ではなく、相場に効くイベントだけ。判断に必要な情報を、過不足なくまとめています。
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(248px,1fr))', gap: '18px' }}>
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth={1.6} strokeLinecap="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <line x1="3" y1="9.5" x2="21" y2="9.5" />
                <line x1="8" y1="3" x2="8" y2="6" />
                <line x1="16" y1="3" x2="16" y2="6" />
              </svg>
            }
            title="日米を1画面で横断"
            body="日本市場と米国市場のイベントを同じカレンダー上に。切り替える手間なく、相場の全体像がつかめます。"
          />
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth={1.6} strokeLinecap="round">
                <line x1="9" y1="7" x2="20" y2="7" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="17" x2="20" y2="17" />
                <circle cx="4.5" cy="7" r="1.3" fill={C.gold} stroke="none" />
                <circle cx="4.5" cy="12" r="1.3" fill={C.gold} stroke="none" />
                <circle cx="4.5" cy="17" r="1.3" fill={C.gold} stroke="none" />
              </svg>
            }
            title="必要なイベントだけ"
            body="政策会合・経済指標・SQ・配当・休場。投資判断に効くものだけに絞り、ノイズを排除した構成です。"
          />
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth={1.6} strokeLinecap="round">
                <circle cx="12" cy="12" r="8.5" />
                <line x1="12" y1="12" x2="12" y2="7.5" />
                <line x1="12" y1="12" x2="15.5" y2="13.5" />
              </svg>
            }
            title="時刻はJSTに自動換算"
            body="米国指標の発表時刻を日本時間に自動変換。夏時間・冬時間の切り替えにも対応しています。"
          />
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth={1.8} strokeLinecap="round">
                <line x1="6" y1="20" x2="6" y2="14" />
                <line x1="12" y1="20" x2="12" y2="9.5" />
                <line x1="18" y1="20" x2="18" y2="6" />
              </svg>
            }
            title="重要度がひと目で"
            body="3段階の重要度と色分け表示。今日まず確認すべきイベントが、開いた瞬間に分かります。"
          />
        </div>
      </section>

      <section id="coverage" style={{ marginTop: '74px', background: '#faf7f2', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '78px 28px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 46px' }}>
            <div style={{ fontFamily: MONO_FONT, fontSize: '11px', letterSpacing: '.22em', color: C.gold, fontWeight: 600 }}>
              COVERAGE
            </div>
            <h2 style={{ fontSize: '31px', lineHeight: 1.45, fontWeight: 700, margin: '13px 0 0', color: '#211e19' }}>
              5つのカテゴリで、相場の節目を網羅。
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.85, color: C.textMid, margin: '14px 0 0' }}>
              いずれも投資判断に直結するイベント。色分けされているので、カレンダー上でも瞬時に見分けられます。
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '14px' }}>
            <CoverageItem color={C.cb} title="中央銀行 政策会合" body="FOMC・日銀の金融政策決定会合。政策金利の発表と総裁会見まで、相場の最重要イベントを掲載。" />
            <CoverageItem color={C.econ} title="経済指標の発表" body="米雇用統計・CPI・GDP、日本の日銀短観・全国CPIなど。予想・前回値つきで発表時刻も確認できます。" />
            <CoverageItem color={C.sq} title="SQ（特別清算指数）" body="先物・オプションのメジャー／マイナーSQ。需給が乱れやすい算出日を事前に把握できます。" />
            <CoverageItem color={C.div} title="配当 権利付き／落ち日" body="配当・株主優待の権利付き最終日と権利落ち日。決算月ごとに、押さえるべき日付を表示します。" />
            <CoverageItem color={C.holiday} title="市場の休場日" body="東証および米国市場の休場日。海外休場による流動性の低下にも、あらかじめ備えられます。" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '10px',
                padding: '20px',
                border: '1px dashed #d8ccb4',
                borderRadius: '12px',
                background: 'rgba(176,125,42,.05)',
              }}
            >
              <div style={{ fontSize: '14.5px', fontWeight: 700, color: C.gold }}>毎月、自動で更新</div>
              <p style={{ fontSize: '12.5px', lineHeight: 1.75, color: C.textMid, margin: 0 }}>
                日程が確定し次第、カレンダーに反映。あなたは開くだけで、最新のスケジュールを確認できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ maxWidth: '1140px', margin: '0 auto', padding: '78px 28px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
          <div style={{ fontFamily: MONO_FONT, fontSize: '11px', letterSpacing: '.22em', color: C.gold, fontWeight: 600 }}>
            PRICING
          </div>
          <h2 style={{ fontSize: '31px', lineHeight: 1.45, fontWeight: 700, margin: '13px 0 0', color: '#211e19' }}>
            まずは無料で。必要になったら年¥980。
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.85, color: C.textMid, margin: '14px 0 0' }}>
            当月分のカレンダーはずっと無料。先の予定を見たくなったら、年額¥980でアップグレードできます。
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 300px', minWidth: '280px', border: `1px solid ${C.border}`, borderRadius: '15px', background: '#fff', padding: '28px 26px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: C.textMid, letterSpacing: '.04em' }}>無料プラン</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '12px' }}>
              <span style={{ fontFamily: MONO_FONT, fontSize: '34px', fontWeight: 600, color: '#211e19' }}>
                <span style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}>¥</span>0
              </span>
              <span style={{ fontSize: '12.5px', color: C.textMid }}>/ ずっと</span>
            </div>
            <div style={{ height: '1px', background: C.border, margin: '20px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {['当月のカレンダーを閲覧', '全イベントの詳細（時刻・予想値）', '日米の重要イベントを横断表示', 'JST自動換算・重要度表示'].map((f) => (
                <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: '#3a342c' }}>
                  <span style={{ color: C.div, flexShrink: 0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/calendar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: '24px',
                padding: '12px',
                border: '1px solid #ddd6ca',
                borderRadius: '9px',
                background: '#fff',
                color: C.textMid,
                fontWeight: 700,
                fontSize: '13.5px',
              }}
            >
              無料で使ってみる
            </Link>
          </div>
          <div
            style={{
              flex: '1 1 300px',
              minWidth: '280px',
              border: `1.5px solid ${C.goldSoft}`,
              borderRadius: '15px',
              background: 'linear-gradient(168deg,#fffdf8,#fdf6e8)',
              padding: '28px 26px',
              position: 'relative',
              boxShadow: '0 18px 44px rgba(176,125,42,.13)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '.1em',
                color: '#2a1e08',
                background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
                padding: '4px 12px',
                borderRadius: '6px',
              }}
            >
              おすすめ
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: C.gold, letterSpacing: '.04em' }}>プレミアム</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '12px' }}>
              <span style={{ fontFamily: MONO_FONT, fontSize: '34px', fontWeight: 600, color: '#211e19' }}>
                <span style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}>¥</span>980
              </span>
              <span style={{ fontSize: '12.5px', color: C.textMid }}>/ 年（税込）</span>
            </div>
            <div style={{ height: '1px', background: '#ecd9ad', margin: '20px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: '#211e19', fontWeight: 600 }}>
                <span style={{ color: C.gold, flexShrink: 0 }}>✓</span>無料プランのすべて
              </div>
              {['翌月以降も無制限に閲覧', 'CSV・PDFで書き出し', 'Googleカレンダー連携', '絞り込み条件の保存・広告非表示'].map((f) => (
                <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: '#3a342c' }}>
                  <span style={{ color: C.gold, flexShrink: 0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/calendar?premium=1"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: '24px',
                padding: '12px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
                color: '#2a1e08',
                fontWeight: 700,
                fontSize: '13.5px',
              }}
            >
              アップグレード
            </Link>
            <div style={{ textAlign: 'center', fontSize: '11px', color: C.textLo, marginTop: '11px' }}>いつでも解約可能</div>
          </div>
        </div>
      </section>

      <section id="faq" style={{ maxWidth: '980px', margin: '0 auto', padding: '74px 28px 24px' }}>
        <div style={{ textAlign: 'center', margin: '0 auto 42px' }}>
          <div style={{ fontFamily: MONO_FONT, fontSize: '11px', letterSpacing: '.22em', color: C.gold, fontWeight: 600 }}>FAQ</div>
          <h2 style={{ fontSize: '31px', lineHeight: 1.45, fontWeight: 700, margin: '13px 0 0', color: '#211e19' }}>よくあるご質問</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(380px,1fr))', gap: '14px 24px' }}>
          <FaqItem
            q="無料でどこまで使えますか？"
            a="当月分のカレンダーとイベント詳細は無料でご利用いただけます。翌月以降の閲覧やCSV／PDF書き出し、Googleカレンダー連携はプレミアム（¥980/年）の機能です。"
          />
          <FaqItem q="対応している市場は？" a="日本（東証）と米国市場が対象です。政策会合・経済指標・SQ・配当の権利日・休場日を収録しています。" />
          <FaqItem
            q="米国指標の時刻は日本時間で見られますか？"
            a="はい。米国の発表時刻を自動で日本時間（JST）に換算して表示します。夏時間・冬時間の切り替えにも対応しています。"
          />
          <FaqItem
            q="スマートフォンでも使えますか？"
            a="はい。スマートフォン・タブレット・PCのいずれのブラウザからもご利用いただけます。アプリのインストールは不要です。"
          />
          <FaqItem q="解約はできますか？" a="いつでも解約できます。解約後も、既に支払い済みの期間の終了まではプレミアム機能をご利用いただけます。" />
          <FaqItem
            q="情報の正確性は？"
            a="公的機関や取引所の公表スケジュールをもとに、最新かつ正確な情報を提供するよう努めておりますが、技術上不正確な記載や誤植を含む場合があり、その正確性を完全に保証するものではありません。掲載内容は情報提供を目的としたものであり、最終的な投資判断はご自身の判断と責任により行っていただきますようお願いいたします。"
          />
          <FaqItem
            q="予定はいつまで先まで見られますか？"
            a="中央銀行の政策会合・SQ・配当の権利日は例年1年分をあらかじめ登録しています。経済指標の発表予定は、直近90日先まで毎日自動で更新しています。"
          />
        </div>
      </section>

      <section style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 28px 78px' }}>
        <div
          style={{
            borderRadius: '18px',
            background: 'linear-gradient(135deg,#2a241b,#3a3225)',
            padding: '52px 36px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ fontSize: '28px', lineHeight: 1.5, fontWeight: 700, color: '#fdf6e8' }}>次の相場の節目を、見逃さない。</div>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#d8cdb8', margin: '14px auto 0', maxWidth: '440px' }}>
            登録は不要。今すぐカレンダーを開いて、今月の重要イベントを確認できます。
          </p>
          <Link
            href="/calendar"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginTop: '26px',
              padding: '0 28px',
              height: '50px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
              color: '#2a1e08',
              fontWeight: 700,
              fontSize: '15px',
            }}
          >
            無料でカレンダーを開く →
          </Link>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.border}`, background: '#f5f1e9' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '48px 28px 36px', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '288px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg,#d8ae5b,#b07d2a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#fffdf7',
                  fontSize: '15px',
                }}
              >
                相
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: 700, letterSpacing: '.03em' }}>相場カレンダー</div>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.8, color: '#8a8170', margin: '14px 0 0' }}>
              日米の政策会合・経済指標・SQ・配当の予定を、投資家のために1画面に。
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '44px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: C.textLo, letterSpacing: '.1em' }}>プロダクト</div>
              <a href="#features" style={{ fontSize: '12.5px', color: C.textMid }}>機能</a>
              <a href="#coverage" style={{ fontSize: '12.5px', color: C.textMid }}>収録イベント</a>
              <a href="#pricing" style={{ fontSize: '12.5px', color: C.textMid }}>料金</a>
              <a href="#faq" style={{ fontSize: '12.5px', color: C.textMid }}>よくある質問</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: C.textLo, letterSpacing: '.1em' }}>解説</div>
              <a href="#coverage" style={{ fontSize: '12.5px', color: C.textMid }}>FOMCとは</a>
              <a href="#coverage" style={{ fontSize: '12.5px', color: C.textMid }}>SQとは</a>
              <a href="#coverage" style={{ fontSize: '12.5px', color: C.textMid }}>配当の権利日</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: C.textLo, letterSpacing: '.1em' }}>運営</div>
              <a href={LEGAL_LINKS.tokushoho} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: C.textMid }}>
                運営者情報
              </a>
              <a href={CONTACT_MAILTO} style={{ fontSize: '12.5px', color: C.textMid }}>
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '20px 28px 0' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '.1em', color: C.textLo }}>【免責事項】</div>
            <p style={{ fontSize: '11px', lineHeight: 1.8, color: '#8a8170', margin: '6px 0 0' }}>
              最新かつ正確な情報を提供するよう努めておりますが、技術上不正確な記載や誤植を含む場合があり、その正確性を完全に保証するものではありません。掲載内容は情報の提供を目的としたものであり、最終的な投資判断は、自らのご判断と責任により行っていただきますようお願いいたします。本情報に基づいて被ったいかなる損害についても、一切責任を負いません。
            </p>
          </div>
          <div
            style={{
              maxWidth: '1140px',
              margin: '0 auto',
              padding: '16px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: MONO_FONT, fontSize: '11px', color: C.textLo }}>© 2026 相場カレンダー</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              <a href={LEGAL_LINKS.terms} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11.5px', color: '#8a8170' }}>
                利用規約
              </a>
              <a href={LEGAL_LINKS.privacy} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11.5px', color: '#8a8170' }}>
                プライバシーポリシー
              </a>
              <a href={LEGAL_LINKS.tokushoho} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11.5px', color: '#8a8170' }}>
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

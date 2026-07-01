'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCalendarState } from './CalendarStateContext';
import { useCalendarData } from './CalendarDataContext';
import { useAuth } from '@/lib/useAuth';
import { fetchEvents } from '@/lib/api';
import { monthCount } from '@/lib/eventView';
import { isoLocal } from '@/lib/dateFormat';
import { PALETTE, TYPE_LABEL_LONG, hexA, MONO_FONT } from '@/lib/palette';
import type { EventRow, FilterKey } from '@/lib/types';

const C = PALETTE;
const FILTER_KEYS: FilterKey[] = ['cb', 'econ', 'sq', 'div', 'holiday'];

function useNextImportantEvent() {
  const [next, setNext] = useState<EventRow | null | undefined>(undefined);
  useEffect(() => {
    const today = new Date();
    const to = new Date(today);
    to.setDate(to.getDate() + 90);
    fetchEvents({ from: isoLocal(today), to: isoLocal(to) })
      .then(({ events }) => {
        const sorted = events.filter((e) => e.importance >= 3).sort((a, b) => (a.event_date < b.event_date ? -1 : 1));
        setNext(sorted[0] ?? null);
      })
      .catch(() => setNext(null));
  }, []);
  return next;
}

export default function Sidebar() {
  const { year, month, filters, toggleFilter, isMobile, sidebarOpen } = useCalendarState();
  const { events, jpHolidays } = useCalendarData();
  const { isPremium } = useAuth();
  const nextEvent = useNextImportantEvent();

  const today = new Date();
  const todayLabel = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}（${
    ['日', '月', '火', '水', '木', '金', '土'][today.getDay()]
  }）`;
  const [, nm, nd] = nextEvent ? nextEvent.event_date.split('-') : ['', '', ''];
  const nextEventDate = nextEvent ? `${+nm}/${+nd}` : '—';
  const nextEventTitle = nextEvent === undefined ? '読み込み中…' : nextEvent ? nextEvent.short_title || nextEvent.title : '予定なし';

  const sidebarBase: React.CSSProperties = {
    width: '252px',
    flexShrink: 0,
    padding: '18px 16px',
    background: C.bg2,
    borderRight: `1px solid ${C.border}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
  };
  const sidebarStyle: React.CSSProperties = isMobile
    ? {
        ...sidebarBase,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        transform: sidebarOpen ? 'none' : 'translateX(-100%)',
        transition: 'transform .26s ease',
        boxShadow: sidebarOpen ? '0 0 40px rgba(40,33,20,.18)' : 'none',
      }
    : sidebarBase;

  return (
    <aside style={sidebarStyle}>
      <Link href="/" title="サイトトップへ" style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '2px 4px 20px', cursor: 'pointer' }}>
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
          <div style={{ fontSize: '15.5px', fontWeight: 700, letterSpacing: '.03em', lineHeight: 1.2, color: '#211e19' }}>
            相場カレンダー
          </div>
          <div style={{ fontSize: '9.5px', color: C.textLo, letterSpacing: '.16em', marginTop: '1px' }}>MARKET CALENDAR</div>
        </div>
      </Link>

      <div style={{ fontSize: '10.5px', color: C.textLo, letterSpacing: '.14em', fontWeight: 700, margin: '0 4px 11px' }}>
        表示するイベント
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {FILTER_KEYS.map((k) => {
          const active = filters[k];
          return (
            <button
              key={k}
              onClick={() => toggleFilter(k)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '6px 9px',
                border: 'none',
                borderRadius: '7px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: active ? hexA(C.gold, 0.08) : 'transparent',
                opacity: active ? 1 : 0.45,
                transition: 'opacity .12s,background .12s',
                color: C.textHi,
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', flexShrink: 0, background: C[k] }} />
              <span style={{ flex: 1, textAlign: 'left', fontSize: '12.5px', whiteSpace: 'nowrap' }}>{TYPE_LABEL_LONG[k]}</span>
              <span style={{ fontFamily: MONO_FONT, fontSize: '11px', color: C.textLo }}>
                {monthCount(events, jpHolidays, year, month, k)}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '16px', padding: '11px 13px', border: `1px solid ${C.border}`, borderRadius: '9px', background: '#faf7f2' }}>
        <div style={{ fontSize: '10px', color: C.textLo, letterSpacing: '.12em', fontWeight: 700 }}>本日</div>
        <div style={{ fontFamily: MONO_FONT, fontSize: '15px', color: '#211e19', marginTop: '3px' }}>{todayLabel}</div>
        <div style={{ height: '1px', background: C.border, margin: '9px 0' }} />
        <div style={{ fontSize: '10px', color: C.textLo, letterSpacing: '.12em', fontWeight: 700 }}>次の重要イベント</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '5px' }}>
          <span style={{ fontFamily: MONO_FONT, fontSize: '12px', color: C.gold, whiteSpace: 'nowrap' }}>{nextEventDate}</span>
          <span style={{ fontSize: '12px', color: C.textMid, lineHeight: 1.35 }}>{nextEventTitle}</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {!isPremium && (
        <div
          style={{
            marginTop: '16px',
            padding: '13px 14px 14px',
            border: '1px solid #ecd9ad',
            borderRadius: '10px',
            background: 'linear-gradient(160deg,#fdf7ea,#fbf2dd)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ fontSize: '10px', color: C.gold, letterSpacing: '.18em', fontWeight: 700 }}>PREMIUM</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span style={{ fontFamily: MONO_FONT, fontSize: '18px', fontWeight: 600, lineHeight: 1.15, color: '#211e19' }}>
                <span style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}>¥</span>980
              </span>
              <span style={{ fontSize: '10px', color: C.textMid }}>/年</span>
            </div>
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 600, marginTop: '8px', lineHeight: 1.6, color: C.textMid }}>
            翌月以降の閲覧・CSV／PDF書き出し・Googleカレンダー連携。
          </div>
          <PremiumUpsellButton />
        </div>
      )}
      {isPremium && (
        <div style={{ marginTop: '18px', padding: '14px 15px', border: '1px solid #bfe2cc', borderRadius: '10px', background: '#f1f9f4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: C.div }}>
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: C.div,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
              }}
            >
              ✓
            </span>
            Premium 有効
          </div>
          <div style={{ fontSize: '11.5px', color: C.textMid, marginTop: '8px', lineHeight: 1.6 }}>
            CSV・PDF書き出し、Googleカレンダー連携、全期間の閲覧が利用できます。
          </div>
        </div>
      )}
    </aside>
  );
}

function PremiumUpsellButton() {
  const { openPremium } = useCalendarState();
  return (
    <button
      onClick={openPremium}
      style={{
        width: '100%',
        marginTop: '11px',
        padding: '9px',
        border: 'none',
        borderRadius: '7px',
        background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
        color: '#2a1e08',
        fontWeight: 700,
        fontSize: '12.5px',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      アップグレード
    </button>
  );
}

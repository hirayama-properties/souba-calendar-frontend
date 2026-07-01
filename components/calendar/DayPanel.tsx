'use client';

import { useState } from 'react';
import { useCalendarState } from './CalendarStateContext';
import { useCalendarData } from './CalendarDataContext';
import { useAuth } from '@/lib/useAuth';
import { allEventsForDate, getEventTimeInfo, type DisplayEvent } from '@/lib/eventView';
import { formatMonthDayJa } from '@/lib/dateFormat';
import { isClosedForDate } from '@/lib/businessDay';
import { gcalSync, PremiumRequiredError } from '@/lib/api';
import { PALETTE, MONO_FONT, TYPE_LABEL, TYPE_COLOR, hexA } from '@/lib/palette';

const C = PALETTE;

function EventCard({ ev }: { ev: DisplayEvent }) {
  const { settings, openPremium } = useCalendarState();
  const { isPremium } = useAuth();
  const [gcalState, setGcalState] = useState<'idle' | 'syncing' | 'done' | 'error'>('idle');

  const col = TYPE_COLOR[ev.type];
  const ti = getEventTimeInfo(ev, settings.timezone);
  const country = ev.country === 'JP' ? { l: '日本', c: C.cb } : { l: '米国', c: C.econ };
  const breakdown = ev.details?.breakdown;

  const addToCalendar = async () => {
    if (!isPremium) {
      openPremium();
      return;
    }
    setGcalState('syncing');
    try {
      await gcalSync({ ids: [ev.id] });
      setGcalState('done');
    } catch (e) {
      if (e instanceof PremiumRequiredError) openPremium();
      else console.error('[DayPanel] gcal-sync failed:', e);
      setGcalState('error');
    }
  };

  return (
    <div style={{ padding: '16px 18px', border: `1px solid ${C.border}`, borderRadius: '11px', background: C.cellAlt, borderLeft: `3px solid ${col}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <span style={{ fontSize: '10.5px', fontWeight: 700, color: col, background: hexA(col, 0.12), padding: '3px 9px', borderRadius: '5px' }}>
          {TYPE_LABEL[ev.type]}
        </span>
        {ti && <span style={{ fontFamily: MONO_FONT, fontSize: '12.5px', color: C.textHi }}>{ti.short}</span>}
        {ev.importance > 0 && (
          <div style={{ display: 'flex', gap: '3px', marginLeft: 'auto', alignItems: 'center' }}>
            <span style={{ fontSize: '9.5px', color: C.textLo, marginRight: '2px' }}>重要度</span>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i < ev.importance ? C.gold : '#ddd6ca' }} />
            ))}
          </div>
        )}
      </div>
      <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '11px', lineHeight: 1.5, color: C.textHi }}>
        {ev.title}
        {ev.details?.sub && (
          <span style={{ fontSize: '10px', color: C.gold, border: `1px solid ${hexA(C.gold, 0.45)}`, borderRadius: '4px', padding: '1px 6px', marginLeft: '7px' }}>
            {ev.details.sub}
          </span>
        )}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '9px', fontSize: '11px', color: C.textMid }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: country.c }} />
        {country.l}
      </div>

      {ti && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
            marginTop: '11px',
            padding: '8px 11px',
            background: hexA(C.gold, 0.07),
            border: `1px solid ${hexA(C.gold, 0.22)}`,
            borderRadius: '8px',
          }}
        >
          <span style={{ fontSize: '10px', color: C.textMid, letterSpacing: '.04em' }}>
            予定時刻（{settings.timezone === 'jst' ? 'JST' : '現地'}）
          </span>
          <span style={{ fontFamily: MONO_FONT, fontSize: '14px', fontWeight: 600, color: C.textHi }}>{ti.jst}</span>
          {ti.note && <span style={{ fontSize: '10.5px', color: C.textLo }}>{ti.note}</span>}
        </div>
      )}

      {breakdown ? (
        <div style={{ marginTop: '12px', border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1fr', background: C.cellAlt, borderBottom: `1px solid ${C.border}` }}>
            {['指標', '前回', '予想', '結果'].map((h, i) => (
              <div key={h} style={{ padding: '8px 9px', fontSize: '9.5px', color: C.textLo, letterSpacing: '.06em', textAlign: i === 0 ? 'left' : 'center' }}>
                {h}
              </div>
            ))}
          </div>
          {breakdown.map((b, i) => (
            <div
              key={b.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.7fr 1fr 1fr 1fr',
                borderBottom: i < breakdown.length - 1 ? `1px solid ${C.border}` : 'none',
                background: '#ffffff',
                alignItems: 'center',
              }}
            >
              <div style={{ padding: '9px 9px', fontSize: '11.5px', lineHeight: 1.4, color: C.textHi, fontWeight: b.bold ? 700 : 500 }}>{b.label}</div>
              <div style={{ padding: '9px 6px', fontFamily: MONO_FONT, fontSize: '12.5px', textAlign: 'center', color: C.textHi }}>{b.prev || '—'}</div>
              <div style={{ padding: '9px 6px', fontFamily: MONO_FONT, fontSize: '12.5px', textAlign: 'center', color: C.textHi }}>{b.fcst || '—'}</div>
              <div style={{ padding: '9px 6px', fontFamily: MONO_FONT, fontSize: '12.5px', textAlign: 'center', color: C.textLo }}>
                {ev.actual_value || '—'}
              </div>
            </div>
          ))}
        </div>
      ) : ev.prev_value || ev.forecast ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: '7px', overflow: 'hidden', marginTop: '12px' }}>
          {[
            ['前回', ev.prev_value || '—'],
            ['予想', ev.forecast || '—'],
            ['結果', ev.actual_value || '—'],
          ].map((r) => (
            <div key={r[0]} style={{ background: '#ffffff', padding: '8px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: '9.5px', color: C.textLo, letterSpacing: '.08em' }}>{r[0]}</div>
              <div style={{ fontFamily: MONO_FONT, fontSize: '13px', marginTop: '3px', color: r[0] === '結果' ? C.textLo : C.textHi }}>{r[1]}</div>
            </div>
          ))}
        </div>
      ) : null}

      {ev.note && <div style={{ fontSize: '12px', color: C.textMid, lineHeight: 1.65, marginTop: '12px' }}>{ev.note}</div>}

      {!ev.synthetic &&
        (isPremium ? (
          <button
            onClick={addToCalendar}
            disabled={gcalState === 'syncing' || gcalState === 'done'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '14px',
              padding: '9px 12px',
              width: '100%',
              justifyContent: 'center',
              border: `1px solid ${hexA(C.div, 0.4)}`,
              background: hexA(C.div, 0.08),
              color: C.div,
              borderRadius: '8px',
              cursor: gcalState === 'idle' || gcalState === 'error' ? 'pointer' : 'default',
              fontFamily: 'inherit',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            {gcalState === 'syncing' ? '追加中…' : gcalState === 'done' ? '追加しました ✓' : gcalState === 'error' ? '追加に失敗しました（再試行）' : 'Googleカレンダーに追加'}
          </button>
        ) : (
          <button
            onClick={openPremium}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '14px',
              padding: '9px 12px',
              width: '100%',
              justifyContent: 'center',
              border: `1px solid ${C.borderL}`,
              background: '#ffffff',
              color: C.textMid,
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '12px',
            }}
          >
            <span style={{ fontSize: '11px' }}>🔒</span>
            Googleカレンダーに追加
            <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.1em', color: '#2a1e08', background: C.goldSoft, padding: '2px 5px', borderRadius: '4px' }}>
              PRO
            </span>
          </button>
        ))}
    </div>
  );
}

export default function DayPanel({ dateIso, onClose }: { dateIso: string | null; onClose: () => void }) {
  const { panelStyle, overlayStyle } = usePanelStyles(dateIso);
  const { events, jpHolidays } = useCalendarData();

  const evs = dateIso ? allEventsForDate(events, jpHolidays, dateIso) : [];
  const closed = dateIso ? isClosedForDate(dateIso, jpHolidays) : false;
  const closedTxt = closed === 'weekend' ? '土日のため取引なし' : closed === 'holiday' || closed === 'yearend' ? '東証 休場日' : '取引日';
  const closedCol = closed ? C.cb : C.div;

  return (
    <>
      <div onClick={onClose} style={overlayStyle} />
      <div style={panelStyle}>
        {dateIso && (
          <>
            <div style={{ padding: '20px 22px 16px', borderBottom: `1px solid ${C.border}`, flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: C.textLo, letterSpacing: '.1em', fontFamily: MONO_FONT }}>{dateIso.replace(/-/g, ' / ')}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, marginTop: '4px', color: C.textHi }}>{formatMonthDayJa(dateIso)}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '9px', fontSize: '11.5px', color: closedCol }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: closedCol }} />
                  {closedTxt}
                </div>
              </div>
              <button onClick={onClose} style={{ width: '32px', height: '32px', border: `1px solid ${C.border}`, background: '#ffffff', color: C.textMid, borderRadius: '8px', cursor: 'pointer', fontSize: '16px', flexShrink: 0 }}>
                ✕
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px 26px', display: 'flex', flexDirection: 'column', gap: '12px', background: C.bg2 }}>
              {evs.length === 0 ? (
                <div style={{ padding: '48px 20px', textAlign: 'center', color: C.textLo }}>
                  <div style={{ fontSize: '34px', marginBottom: '10px', opacity: 0.4 }}>—</div>
                  <div style={{ fontSize: '13px' }}>登録されたイベントはありません</div>
                </div>
              ) : (
                evs.map((ev) => <EventCard key={ev.id} ev={ev} />)
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function usePanelStyles(dateIso: string | null) {
  const { isMobile } = useCalendarState();
  const panelOpen = !!dateIso;
  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: isMobile ? '100%' : '430px',
    background: PALETTE.bg2,
    borderLeft: `1px solid ${PALETTE.border}`,
    zIndex: 48,
    transform: panelOpen ? 'translateX(0)' : 'translateX(101%)',
    transition: 'transform .28s cubic-bezier(.4,0,.2,1)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: panelOpen ? '-12px 0 40px rgba(40,33,20,.12)' : 'none',
  };
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 46,
    background: 'rgba(40,33,20,.28)',
    opacity: panelOpen ? 1 : 0,
    pointerEvents: panelOpen ? 'auto' : 'none',
    transition: 'opacity .28s',
  };
  return { panelOpen, panelStyle, overlayStyle };
}

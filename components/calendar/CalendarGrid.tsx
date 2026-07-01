'use client';

import { useCalendarState } from './CalendarStateContext';
import { useCalendarData } from './CalendarDataContext';
import { useAuth } from '@/lib/useAuth';
import { eventsForDate, getEventTimeInfo } from '@/lib/eventView';
import { isoLocal } from '@/lib/dateFormat';
import { isClosedForDate } from '@/lib/businessDay';
import { PALETTE, MONO_FONT, TYPE_COLOR, hexA } from '@/lib/palette';

const C = PALETTE;
const WEEKDAY_FULL = ['日', '月', '火', '水', '木', '金', '土'];

function isLockedMonth(year: number, month: number, isPremium: boolean): boolean {
  if (isPremium) return false;
  const today = new Date();
  return year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth());
}

export default function CalendarGrid({ onOpenDay }: { onOpenDay: (dateIso: string) => void }) {
  const { year, month, isMobile, filters, settings, searchText, openPremium } = useCalendarState();
  const { events, jpHolidays } = useCalendarData();
  const { isPremium } = useAuth();

  const weekStart = settings.weekStart;
  const order = weekStart === 'mon' ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6];
  const first = new Date(year, month, 1, 12);
  const offset = weekStart === 'mon' ? (first.getDay() + 6) % 7 : first.getDay();
  const start = new Date(year, month, 1 - offset, 12);

  const cells: Date[] = [];
  const cur = new Date(start);
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  const rows: Date[][] = [];
  for (let r = 0; r < 6; r++) {
    const slice = cells.slice(r * 7, r * 7 + 7);
    if (r === 5 && slice.every((d) => d.getMonth() !== month)) continue;
    rows.push(slice);
  }

  const maxChips = isMobile ? 2 : 3;
  const todayIso = isoLocal(new Date());
  const locked = isLockedMonth(year, month, isPremium);

  const card = (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: '11px',
        overflow: 'hidden',
        background: C.cell,
        width: '100%',
        boxShadow: '0 1px 3px rgba(40,33,20,.05), 0 10px 30px rgba(40,33,20,.04)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
          borderBottom: `1px solid ${C.border}`,
          background: C.cellAlt,
        }}
      >
        {order.map((dow, i) => (
          <div
            key={i}
            style={{
              padding: '9px 0',
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '.12em',
              color: dow === 0 ? C.cb : dow === 6 ? C.econ : C.textMid,
            }}
          >
            {WEEKDAY_FULL[dow]}
          </div>
        ))}
      </div>
      {rows.map((week, ri) => (
        <div
          key={ri}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
            borderBottom: ri < rows.length - 1 ? `1px solid ${C.border}` : 'none',
          }}
        >
          {week.map((d, ci) => {
            const di = isoLocal(d);
            const inMonth = d.getMonth() === month;
            const dow = d.getDay();
            const closed = isClosedForDate(di, jpHolidays);
            const today = di === todayIso;
            const hd = jpHolidays.get(di);
            const evs = eventsForDate(events, jpHolidays, di, filters, settings.minImp, searchText);

            let numColor: string = C.textHi;
            if (!inMonth) numColor = '#c4bcae';
            else if (dow === 0 || hd) numColor = C.cb;
            else if (dow === 6) numColor = C.econ;

            let bg = '#ffffff';
            if (closed === 'holiday' || closed === 'yearend') bg = '#fdf4f2';
            else if (dow === 0 || dow === 6) bg = '#faf8f4';
            if (!inMonth) bg = '#f6f3ee';

            return (
              <div
                key={ci}
                onClick={() => onOpenDay(di)}
                style={{
                  minHeight: isMobile ? '76px' : '118px',
                  borderRight: ci < 6 ? `1px solid ${C.border}` : 'none',
                  padding: '6px 6px 7px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  cursor: 'pointer',
                  background: bg,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '22px' }}>
                  {today ? (
                    <span
                      style={{
                        fontFamily: MONO_FONT,
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#ffffff',
                        background: C.gold,
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {d.getDate()}
                    </span>
                  ) : (
                    <span style={{ fontFamily: MONO_FONT, fontSize: '13px', fontWeight: 600, color: numColor }}>{d.getDate()}</span>
                  )}
                  {(closed === 'holiday' || closed === 'yearend') && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: C.cb,
                        background: hexA(C.cb, 0.1),
                        borderRadius: '3px',
                        padding: '1px 5px',
                        lineHeight: '14px',
                      }}
                    >
                      休
                    </span>
                  )}
                </div>
                {evs.slice(0, maxChips).map((ev) => {
                  const col = TYPE_COLOR[ev.type];
                  const ti = getEventTimeInfo(ev, settings.timezone);
                  return (
                    <div
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDay(di);
                      }}
                      style={{
                        fontSize: '10.5px',
                        lineHeight: 1.3,
                        padding: '2px 5px 2px 6px',
                        borderRadius: '3px',
                        background: hexA(col, ev.importance >= 3 ? 0.14 : 0.09),
                        borderLeft: `2px solid ${col}`,
                        color: '#3a342c',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                      }}
                    >
                      {ti && <span style={{ fontFamily: MONO_FONT, fontSize: '9px', color: C.textMid, flexShrink: 0 }}>{ti.short}</span>}
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.short_title || ev.title}</span>
                    </div>
                  );
                })}
                {evs.length > maxChips && (
                  <div style={{ fontSize: '10px', color: C.textMid, paddingLeft: '3px' }}>＋{evs.length - maxChips}件</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  if (locked) {
    return (
      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative' }}>
        <div style={{ filter: 'blur(4px)', opacity: 0.6, pointerEvents: 'none', userSelect: 'none' }}>{card}</div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #ecd9ad',
              borderRadius: '15px',
              padding: '30px 32px 28px',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(40,33,20,.18)',
            }}
          >
            <div style={{ fontSize: '30px', lineHeight: 1 }}>🔒</div>
            <div style={{ fontSize: '11px', letterSpacing: '.2em', color: C.gold, fontWeight: 700, marginTop: '12px' }}>PREMIUM</div>
            <div style={{ fontSize: '18.5px', fontWeight: 700, marginTop: '10px', lineHeight: 1.55, color: C.textHi, whiteSpace: 'pre-line' }}>
              {'翌月以降のカレンダーは\nプレミアム機能です'}
            </div>
            <div style={{ fontSize: '12.5px', color: C.textMid, marginTop: '11px', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
              {'日米の政策会合・経済指標・SQ・配当の予定を、\n先の月まで自由に確認できます。'}
            </div>
            <button
              onClick={openPremium}
              style={{
                marginTop: '20px',
                padding: '12px 28px',
                border: 'none',
                borderRadius: '9px',
                background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
                color: '#2a1e08',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ¥980/年でアップグレード
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div style={{ maxWidth: '1180px', margin: '0 auto' }}>{card}</div>;
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEvents } from '@/lib/api';
import { getEventTimeInfo } from '@/lib/eventView';
import { isoLocal, weekdayNameJa } from '@/lib/dateFormat';
import { PALETTE, TYPE_LABEL, TYPE_COLOR, hexA, MONO_FONT } from '@/lib/palette';
import type { EventRow } from '@/lib/types';

export default function HeroAgendaCard() {
  const [events, setEvents] = useState<EventRow[] | null>(null);

  useEffect(() => {
    const today = new Date();
    const to = new Date(today);
    to.setDate(to.getDate() + 90);
    fetchEvents({ from: isoLocal(today), to: isoLocal(to) })
      .then(({ events }) =>
        setEvents(
          events
            .filter((e) => e.importance >= 3)
            .sort((a, b) => (a.event_date < b.event_date ? -1 : 1))
            .slice(0, 5),
        ),
      )
      .catch((e) => {
        console.error('[HeroAgendaCard] failed to load events:', e);
        setEvents([]);
      });
  }, []);

  return (
    <div style={{ flex: '1 1 360px', minWidth: '300px' }}>
      <div
        style={{
          background: '#fff',
          border: `1px solid ${PALETTE.border}`,
          borderRadius: '14px',
          boxShadow: '0 1px 3px rgba(40,33,20,.05),0 22px 54px rgba(40,33,20,.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 18px',
            borderBottom: `1px solid ${PALETTE.border}`,
            background: '#faf7f2',
          }}
        >
          <div style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '.04em' }}>今後の重要イベント</div>
          <div style={{ fontFamily: MONO_FONT, fontSize: '10.5px', color: PALETTE.textLo, letterSpacing: '.1em' }}>
            JST 表示
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(events ?? Array.from({ length: 5 })).map((ev, i) => {
            const ti = ev ? getEventTimeInfo(ev, 'jst') : null;
            const [, m, d] = ev ? ev.event_date.split('-') : ['', '', ''];
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '13px 18px',
                  borderBottom: '1px solid #f1ece3',
                  minHeight: '54px',
                }}
              >
                {ev && (
                  <>
                    <div style={{ textAlign: 'center', flexShrink: 0, width: '42px' }}>
                      <div style={{ fontFamily: MONO_FONT, fontSize: '15px', fontWeight: 600, color: '#211e19' }}>
                        {`${+m}/${+d}`}
                      </div>
                      <div style={{ fontSize: '10px', color: PALETTE.textLo, marginTop: '1px' }}>
                        {weekdayNameJa(ev.event_date)}
                      </div>
                    </div>
                    <div
                      style={{ width: '3px', height: '32px', borderRadius: '2px', flexShrink: 0, background: TYPE_COLOR[ev.type] }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '9.5px',
                            fontWeight: 700,
                            padding: '2px 7px',
                            borderRadius: '4px',
                            color: TYPE_COLOR[ev.type],
                            background: hexA(TYPE_COLOR[ev.type], 0.12),
                          }}
                        >
                          {TYPE_LABEL[ev.type]}
                        </span>
                        <span style={{ fontFamily: MONO_FONT, fontSize: '11px', color: PALETTE.textMid }}>
                          {ti ? ti.jst : '終日'}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#211e19',
                          marginTop: '5px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ev.short_title || ev.title}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <Link
          href="/calendar"
          style={{
            display: 'block',
            padding: '13px 18px',
            textAlign: 'center',
            fontSize: '12.5px',
            color: PALETTE.gold,
            fontWeight: 700,
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          カレンダーですべて見る →
        </Link>
      </div>
    </div>
  );
}

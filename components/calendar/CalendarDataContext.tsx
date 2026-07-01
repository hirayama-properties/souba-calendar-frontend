'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchEvents } from '@/lib/api';
import { fetchJpHolidayMap } from '@/lib/businessDay';
import { isoLocal } from '@/lib/dateFormat';
import { useCalendarState } from './CalendarStateContext';
import type { EventRow } from '@/lib/types';

interface CalendarDataValue {
  events: EventRow[];
  jpHolidays: Map<string, string>;
  loading: boolean;
  error: string | null;
  isPremium: boolean;
  gridFrom: string;
  gridTo: string;
}

const CalendarDataContext = createContext<CalendarDataValue | null>(null);

/** The 42-cell grid can spill a few days into the adjacent months, so the
 * data window (events + holidays) must cover that, not just [1st, last]. */
function gridRange(year: number, month: number, weekStart: 'sun' | 'mon') {
  const first = new Date(year, month, 1, 12);
  const offset = weekStart === 'mon' ? (first.getDay() + 6) % 7 : first.getDay();
  const start = new Date(year, month, 1 - offset, 12);
  const end = new Date(start);
  end.setDate(end.getDate() + 41);
  return { from: isoLocal(start), to: isoLocal(end) };
}

export function CalendarDataProvider({ children }: { children: React.ReactNode }) {
  const { year, month, settings } = useCalendarState();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [jpHolidays, setJpHolidays] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const { from, to } = useMemo(() => gridRange(year, month, settings.weekStart), [year, month, settings.weekStart]);

  useEffect(() => {
    let cancelled = false;
    // Deferred a microtask so the initial setLoading/setError aren't called
    // synchronously in the effect body (react-hooks/set-state-in-effect).
    queueMicrotask(async () => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      try {
        const [eventsRes, holidaysRes] = await Promise.all([fetchEvents({ from, to }), fetchJpHolidayMap(from, to)]);
        if (cancelled) return;
        setEvents(eventsRes.events);
        setIsPremium(eventsRes.isPremium);
        setJpHolidays(holidaysRes);
      } catch (e) {
        if (cancelled) return;
        console.error('[CalendarDataProvider] failed to load calendar data:', e);
        setError(String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  const value: CalendarDataValue = { events, jpHolidays, loading, error, isPremium, gridFrom: from, gridTo: to };
  return <CalendarDataContext.Provider value={value}>{children}</CalendarDataContext.Provider>;
}

export function useCalendarData(): CalendarDataValue {
  const ctx = useContext(CalendarDataContext);
  if (!ctx) throw new Error('useCalendarData must be used within a CalendarDataProvider');
  return ctx;
}

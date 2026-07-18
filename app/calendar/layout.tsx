import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CalendarStateProvider } from '@/components/calendar/CalendarStateContext';
import { CalendarDataProvider } from '@/components/calendar/CalendarDataContext';
import PremiumModal from '@/components/calendar/PremiumModal';
import PremiumQueryHandler from '@/components/calendar/PremiumQueryHandler';

// /calendar/page.tsx and this layout's own children are all 'use client'
// (they read auth/calendar-state hooks), so neither can export `metadata`
// directly — this file stays a plain Server Component for that reason,
// carrying the metadata for the whole /calendar subtree (including
// /calendar/settings, which inherits it unless it sets its own).
export const metadata: Metadata = {
  title: 'カレンダー',
  description: 'FOMC・日銀会合・米雇用統計・CPI・SQ・配当の権利日まで、日米の重要スケジュールを1つのカレンダーで確認できます。',
  alternates: { canonical: '/calendar' },
};

// Only the shared state/data providers + the premium modal (which both
// /calendar and /calendar/settings can open) live here. The sidebar/app-shell
// chrome is NOT here — the prototype's settings screen is a full-viewport
// takeover with no sidebar (相場カレンダー.dc.html `showSettings` block), so
// that chrome belongs to app/calendar/page.tsx instead, not this shared layout.
export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <CalendarStateProvider>
      <CalendarDataProvider>
        {children}
        <PremiumModal />
        <Suspense fallback={null}>
          <PremiumQueryHandler />
        </Suspense>
      </CalendarDataProvider>
    </CalendarStateProvider>
  );
}

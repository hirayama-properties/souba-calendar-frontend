'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CalendarStateProvider, useCalendarState } from '@/components/calendar/CalendarStateContext';
import { CalendarDataProvider } from '@/components/calendar/CalendarDataContext';
import PremiumModal from '@/components/calendar/PremiumModal';

/** Lets `/calendar?premium=1` (linked from the LP's pricing CTA) auto-open
 * the premium modal, matching the prototype's `startPremium()` behavior. */
function PremiumQueryHandler() {
  const searchParams = useSearchParams();
  const { openPremium } = useCalendarState();
  const wantsPremium = searchParams.get('premium') === '1';

  useEffect(() => {
    if (wantsPremium) openPremium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantsPremium]);

  return null;
}

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

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCalendarState } from './CalendarStateContext';

/** Lets `/calendar?premium=1` (linked from the LP's pricing CTA) auto-open
 * the premium modal, matching the prototype's `startPremium()` behavior. */
export default function PremiumQueryHandler() {
  const searchParams = useSearchParams();
  const { openPremium } = useCalendarState();
  const wantsPremium = searchParams.get('premium') === '1';

  useEffect(() => {
    if (wantsPremium) openPremium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantsPremium]);

  return null;
}

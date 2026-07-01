'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCalendarState } from '@/components/calendar/CalendarStateContext';
import Sidebar from '@/components/calendar/Sidebar';
import TopBar from '@/components/calendar/TopBar';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import DayPanel from '@/components/calendar/DayPanel';

function CalendarPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get('date');
  const { isMobile, sidebarOpen, toggleSidebar } = useCalendarState();

  const openDay = (dateIso: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', dateIso);
    router.push(`/calendar?${params.toString()}`, { scroll: false });
  };

  const closePanel = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('date');
    const qs = params.toString();
    router.push(`/calendar${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        background: '#fbfaf8',
        color: '#211e19',
        fontFamily: 'var(--font-noto-sans-jp), sans-serif',
        overflow: 'hidden',
        position: 'relative',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Sidebar />
      <div
        onClick={toggleSidebar}
        style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'rgba(40,33,20,.35)', display: isMobile && sidebarOpen ? 'block' : 'none' }}
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopBar />
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 22px 28px', background: '#fbfaf8' }}>
          <CalendarGrid onOpenDay={openDay} />
        </div>
      </div>
      <DayPanel dateIso={selectedDate} onClose={closePanel} />
    </div>
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={null}>
      <CalendarPageInner />
    </Suspense>
  );
}

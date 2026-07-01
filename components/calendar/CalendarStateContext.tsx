'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { CalendarSettings, FilterKey } from '@/lib/types';

export type FiltersState = Record<FilterKey, boolean>;

interface CalendarStateValue {
  year: number;
  month: number; // 0-indexed, matches the prototype (Date#getMonth())
  setYearMonth: (year: number, month: number) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;

  filters: FiltersState;
  toggleFilter: (k: FilterKey) => void;

  settings: CalendarSettings;
  setSetting: <K extends keyof CalendarSettings>(key: K, value: CalendarSettings[K]) => void;

  searchText: string;
  setSearchText: (v: string) => void;

  isMobile: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  premiumOpen: boolean;
  openPremium: () => void;
  closePremium: () => void;
}

const CalendarStateContext = createContext<CalendarStateValue | null>(null);

const DEFAULT_FILTERS: FiltersState = { cb: true, econ: true, sq: true, div: true, holiday: true };
const DEFAULT_SETTINGS: CalendarSettings = { weekStart: 'sun', timezone: 'jst', minImp: 0 };

export function CalendarStateProvider({ children }: { children: React.ReactNode }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [settings, setSettings] = useState<CalendarSettings>(DEFAULT_SETTINGS);
  const [searchText, setSearchText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 880;
      setIsMobile((prev) => (prev !== mobile ? mobile : prev));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const setYearMonth = (y: number, m: number) => {
    setYear(y);
    setMonth(m);
  };
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };
  const goToday = () => {
    const t = new Date();
    setYear(t.getFullYear());
    setMonth(t.getMonth());
    setSidebarOpen(false);
  };

  const toggleFilter = (k: FilterKey) => setFilters((f) => ({ ...f, [k]: !f[k] }));
  const setSetting = <K extends keyof CalendarSettings>(key: K, value: CalendarSettings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const value: CalendarStateValue = {
    year,
    month,
    setYearMonth,
    prevMonth,
    nextMonth,
    goToday,
    filters,
    toggleFilter,
    settings,
    setSetting,
    searchText,
    setSearchText,
    isMobile,
    sidebarOpen,
    toggleSidebar: () => setSidebarOpen((v) => !v),
    closeSidebar: () => setSidebarOpen(false),
    premiumOpen,
    openPremium: () => setPremiumOpen(true),
    closePremium: () => setPremiumOpen(false),
  };

  return <CalendarStateContext.Provider value={value}>{children}</CalendarStateContext.Provider>;
}

export function useCalendarState(): CalendarStateValue {
  const ctx = useContext(CalendarStateContext);
  if (!ctx) throw new Error('useCalendarState must be used within a CalendarStateProvider');
  return ctx;
}

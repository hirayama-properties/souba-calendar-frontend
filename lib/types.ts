export type EventType = 'cb' | 'econ' | 'sq' | 'div' | 'holiday';
export type Country = 'JP' | 'US';
export type TimeStatus = 'fixed' | 'tbd' | 'allday';

export interface EventBreakdownRow {
  label: string;
  prev?: string;
  fcst?: string;
  bold?: boolean;
}

export interface EventDetails {
  breakdown?: EventBreakdownRow[];
  sub?: string;
}

/** Row shape returned by the backend `events` table / events-api function. */
export interface EventRow {
  id: string;
  event_date: string; // YYYY-MM-DD
  starts_at: string | null; // ISO timestamptz (UTC)
  time_status: TimeStatus;
  type: EventType;
  country: Country;
  title: string;
  short_title: string | null;
  importance: number; // 0..3
  prev_value: string | null;
  forecast: string | null;
  actual_value: string | null;
  note: string | null;
  details: EventDetails | null;
  source: string;
  source_uid: string | null;
}

export interface HolidayRow {
  holiday_date: string;
  name: string;
  country: Country;
}

export interface Profile {
  id: string;
  is_premium: boolean;
  notify_enabled: boolean;
  notify_min_importance: number;
  current_period_end: string | null;
}

export type FilterKey = EventType;

export interface CalendarSettings {
  weekStart: 'sun' | 'mon';
  timezone: 'jst' | 'local';
  minImp: 0 | 2 | 3;
}

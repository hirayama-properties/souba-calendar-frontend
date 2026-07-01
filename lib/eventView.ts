import type { EventRow, FilterKey } from './types';

export type DisplayEvent = EventRow & { synthetic?: boolean };
export type FiltersState = Record<FilterKey, boolean>;

export interface EventTimeInfo {
  /** Short JST time for calendar chips, e.g. "21:30" or "翌03:00" or "未定". */
  short: string;
  /** JST time (with "（翌日）" suffix when it lands on the next JST day). */
  jst: string;
  /** Supplementary note, e.g. "米国 08:30 ET（夏時間）から換算". Empty for JP events. */
  note: string;
}

function formatHHMM(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('ja-JP', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(
    new Date(iso),
  );
}

function formatDateInTz(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(
    new Date(iso),
  );
}

/** "EDT"/"EST" -> 夏時間/冬時間 label, via Intl's own IANA tz database (no manual DST math needed). */
function usEasternZoneName(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', timeZoneName: 'short' }).formatToParts(
    new Date(iso),
  );
  const tz = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  if (tz.includes('DT')) return '夏時間';
  if (tz.includes('ST')) return '冬時間';
  return '';
}

/**
 * Derives the prototype's `timeInfo(ev)` view (相場カレンダー.dc.html
 * Component#timeInfo) from the backend's UTC `starts_at`. Because `starts_at`
 * is already an absolute UTC instant, converting to JST is just formatting in
 * the "Asia/Tokyo" IANA zone — no manual DST arithmetic needed (unlike the
 * prototype/backend's ET->JST port, which had to reconstruct JST from a bare
 * "HH:MM ET" string with no date-zone information attached).
 */
export function getEventTimeInfo(ev: EventRow, displayTimezone: 'jst' | 'local'): EventTimeInfo | null {
  if (ev.time_status === 'allday') return null;

  // Checked before the `starts_at` requirement below: a tbd event (e.g. a
  // BOJ decision or a JP release with no known time yet) has no starts_at at
  // all, but should still render "未定" rather than nothing.
  if (ev.time_status === 'tbd') {
    return { short: '未定', jst: '未定（昼頃）', note: '会合終了後に発表のため時刻未定' };
  }

  if (!ev.starts_at) return null;

  const jstTime = formatHHMM(ev.starts_at, 'Asia/Tokyo');
  const jstDate = formatDateInTz(ev.starts_at, 'Asia/Tokyo');
  const nextDay = jstDate !== ev.event_date;

  if (ev.country === 'JP') {
    return { short: jstTime, jst: jstTime, note: '' };
  }

  // US event: JST is the conversion target; ET is shown as context in `note`.
  const etTime = formatHHMM(ev.starts_at, 'America/New_York');
  const dstLabel = usEasternZoneName(ev.starts_at);
  if (displayTimezone === 'local') {
    return {
      short: etTime,
      jst: `${etTime} ET`,
      note: `米国現地時間（${dstLabel}）`,
    };
  }
  return {
    short: nextDay ? `翌${jstTime}` : jstTime,
    jst: nextDay ? `${jstTime}（翌日）` : jstTime,
    note: `米国 ${etTime} ET（${dstLabel}）から換算`,
  };
}

/** A JP holiday rendered as a calendar entry — ported from the prototype's
 * ad-hoc `{...,_h:1}` object built inline in `eventsFor`/`allEventsFor`. */
function holidayAsDisplayEvent(dateIso: string, holidayName: string): DisplayEvent {
  return {
    id: `holiday-${dateIso}`,
    event_date: dateIso,
    starts_at: null,
    time_status: 'allday',
    type: 'holiday',
    country: 'JP',
    title: `${holidayName}（東証 休場）`,
    short_title: holidayName,
    importance: 0,
    prev_value: null,
    forecast: null,
    actual_value: null,
    note: '国民の祝日のため、東京証券取引所は終日休場です。',
    details: null,
    source: 'holiday-synthetic',
    source_uid: null,
    synthetic: true,
  };
}

function sortByImportanceThenTime(a: DisplayEvent, b: DisplayEvent): number {
  if (b.importance !== a.importance) return b.importance - a.importance;
  const ta = a.starts_at ?? 'zz';
  const tb = b.starts_at ?? 'zz';
  return ta < tb ? -1 : ta > tb ? 1 : 0;
}

/** Ported from the prototype's `eventsFor(di)` — applies filters/search/min-importance. */
export function eventsForDate(
  events: EventRow[],
  jpHolidays: Map<string, string>,
  dateIso: string,
  filters: FiltersState,
  minImportance: number,
  searchText: string,
): DisplayEvent[] {
  const st = searchText.trim();
  let out: DisplayEvent[] = events.filter(
    (ev) => ev.event_date === dateIso && filters[ev.type] && ev.importance >= minImportance && (!st || ev.title.includes(st)),
  );
  const holidayName = jpHolidays.get(dateIso);
  if (holidayName && filters.holiday && (!st || holidayName.includes(st))) {
    out = out.concat([holidayAsDisplayEvent(dateIso, holidayName)]);
  }
  return out.sort(sortByImportanceThenTime);
}

/** Ported from the prototype's `allEventsFor(di)` — used by the day detail panel (no filters/search applied). */
export function allEventsForDate(events: EventRow[], jpHolidays: Map<string, string>, dateIso: string): DisplayEvent[] {
  let out: DisplayEvent[] = events.filter((ev) => ev.event_date === dateIso);
  const holidayName = jpHolidays.get(dateIso);
  if (holidayName) out = out.concat([holidayAsDisplayEvent(dateIso, holidayName)]);
  return out.sort(sortByImportanceThenTime);
}

/** Ported from the prototype's `monthCount(k)` — used for the sidebar filter counts. */
export function monthCount(
  events: EventRow[],
  jpHolidays: Map<string, string>,
  year: number,
  month: number,
  key: FilterKey,
): number {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  let count = events.filter((ev) => ev.type === key && ev.event_date.startsWith(prefix)).length;
  if (key === 'holiday') {
    count += [...jpHolidays.keys()].filter((d) => d.startsWith(prefix)).length;
  }
  return count;
}

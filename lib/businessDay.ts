import { supabase } from './supabaseClient';

export type ClosedReason = 'weekend' | 'holiday' | 'yearend' | false;

/** Ported from the prototype's `isClosed(d)` — TSE year-end/new-year closure
 * (Dec 31 - Jan 3) plus weekends plus any JP holiday in `jpHolidayNames`. */
export function isClosedForDate(dateIso: string, jpHolidayNames: Map<string, string>): ClosedReason {
  const d = new Date(`${dateIso}T12:00:00`);
  const dow = d.getDay();
  if (dow === 0 || dow === 6) return 'weekend';
  if (jpHolidayNames.has(dateIso)) return 'holiday';
  const [, m, day] = dateIso.split('-').map(Number);
  if ((m === 12 && day === 31) || (m === 1 && day <= 3)) return 'yearend';
  return false;
}

/** `holidays` is publicly readable (RLS), so this is a direct table query — no Edge Function needed. */
export async function fetchJpHolidayMap(fromIso: string, toIso: string): Promise<Map<string, string>> {
  const { data, error } = await supabase
    .from('holidays')
    .select('holiday_date, name')
    .eq('country', 'JP')
    .gte('holiday_date', fromIso)
    .lte('holiday_date', toIso);
  if (error) throw error;
  return new Map((data ?? []).map((h) => [h.holiday_date as string, h.name as string]));
}

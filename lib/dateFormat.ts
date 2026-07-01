const WEEKDAY_JA = ['日', '月', '火', '水', '木', '金', '土'];

/** Local-time "YYYY-MM-DD" (no UTC conversion) — matches the prototype's `iso(d)`. */
export function isoLocal(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function parseIsoLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
}

export function weekdayNameJa(iso: string): string {
  return WEEKDAY_JA[parseIsoLocal(iso).getDay()];
}

/** "7月10日（金）" — ported from the prototype's `fmtDate(di)`. */
export function formatMonthDayJa(iso: string): string {
  const d = parseIsoLocal(iso);
  return `${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAY_JA[d.getDay()]}）`;
}

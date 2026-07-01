import type { EventType } from './types';

// Colors/labels ported verbatim from the prototype's `C` and `TLB`/`TL`
// constants (相場カレンダー.dc.html Component class).
export const PALETTE = {
  bg: '#fbfaf8',
  bg2: '#ffffff',
  cell: '#ffffff',
  cellAlt: '#faf7f2',
  border: '#ebe6dd',
  borderL: '#ddd6ca',
  gold: '#b07d2a',
  goldSoft: '#d8ae5b',
  textHi: '#211e19',
  textMid: '#6f6658',
  textLo: '#a8a092',
  cb: '#cf4636',
  econ: '#2f72c4',
  sq: '#8a52c0',
  div: '#2e9c63',
  holiday: '#9c8a64',
} as const;

export const MONO_FONT = "var(--font-ibm-plex-mono), monospace";

export const TYPE_COLOR: Record<EventType, string> = {
  cb: PALETTE.cb,
  econ: PALETTE.econ,
  sq: PALETTE.sq,
  div: PALETTE.div,
  holiday: PALETTE.holiday,
};

export const TYPE_LABEL: Record<EventType, string> = {
  cb: '中央銀行',
  econ: '経済指標',
  sq: 'SQ',
  div: '配当',
  holiday: '休場',
};

export const TYPE_LABEL_LONG: Record<EventType, string> = {
  cb: '中央銀行 政策会合',
  econ: '経済指標の発表',
  sq: 'SQ（特別清算指数）',
  div: '配当 権利付き／落ち',
  holiday: '市場の休場日',
};

/** hex "#rrggbb" -> "rgba(r,g,b,a)", ported from the prototype's `hexA()`. */
export function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

import type { EventType } from './types';

// Google Calendar's 11 fixed event colors (colors.event resource of the
// Calendar API — https://developers.google.com/calendar/api/v3/reference/colors).
// Hex values are Google's own swatch colors, not guessed.
export interface GcalColorOption {
  id: string;
  name: string;
  hex: string;
}

export const GCAL_COLORS: GcalColorOption[] = [
  { id: '1', name: 'Lavender', hex: '#7986cb' },
  { id: '2', name: 'Sage', hex: '#33b679' },
  { id: '3', name: 'Grape', hex: '#8e24aa' },
  { id: '4', name: 'Flamingo', hex: '#e67c73' },
  { id: '5', name: 'Banana', hex: '#f6c026' },
  { id: '6', name: 'Tangerine', hex: '#f5511d' },
  { id: '7', name: 'Peacock', hex: '#039be5' },
  { id: '8', name: 'Graphite', hex: '#616161' },
  { id: '9', name: 'Blueberry', hex: '#3f51b5' },
  { id: '10', name: 'Basil', hex: '#0b8043' },
  { id: '11', name: 'Tomato', hex: '#d60000' },
];

/** Closest Google colors to this app's own event-type palette (lib/palette.ts). */
export const DEFAULT_GCAL_COLOR_MAP: Record<EventType, string> = {
  cb: '11', // Tomato — close to PALETTE.cb #cf4636
  econ: '7', // Peacock — close to PALETTE.econ #2f72c4
  sq: '3', // Grape — close to PALETTE.sq #8a52c0
  div: '10', // Basil — close to PALETTE.div #2e9c63
  holiday: '8', // Graphite — neutral stand-in for PALETTE.holiday #9c8a64
};

export function gcalColorHex(id: string | undefined): string {
  return GCAL_COLORS.find((c) => c.id === id)?.hex ?? '#c8c0b0';
}

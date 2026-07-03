import { supabase, SUPABASE_ANON_KEY, SUPABASE_URL } from './supabaseClient';
import type { EventRow } from './types';

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? SUPABASE_ANON_KEY;
  return { Authorization: `Bearer ${token}`, apikey: SUPABASE_ANON_KEY };
}

function functionUrl(name: string): string {
  return `${SUPABASE_URL}/functions/v1/${name}`;
}

export class PremiumRequiredError extends Error {
  constructor() {
    super('premium_required');
  }
}

export interface EventsQuery {
  from?: string;
  to?: string;
  types?: string[];
  countries?: string[];
  ids?: string[];
}

function buildQueryString(params: EventsQuery): string {
  const q = new URLSearchParams();
  if (params.from) q.set('from', params.from);
  if (params.to) q.set('to', params.to);
  if (params.types?.length) q.set('types', params.types.join(','));
  if (params.countries?.length) q.set('country', params.countries.join(','));
  if (params.ids?.length) q.set('ids', params.ids.join(','));
  return q.toString();
}

export async function fetchEvents(params: EventsQuery): Promise<{ events: EventRow[]; isPremium: boolean }> {
  const headers = await authHeaders();
  const res = await fetch(`${functionUrl('events-api')}?${buildQueryString(params)}`, { headers });
  if (!res.ok) throw new Error(`events-api failed: HTTP ${res.status}`);
  return res.json();
}

export async function fetchEventById(id: string): Promise<EventRow> {
  const headers = await authHeaders();
  const res = await fetch(`${functionUrl('events-api')}?id=${encodeURIComponent(id)}`, { headers });
  if (res.status === 404) throw new Error('not_found');
  if (!res.ok) throw new Error(`events-api failed: HTTP ${res.status}`);
  return res.json();
}

async function downloadExport(kind: 'export-csv' | 'export-pdf', params: EventsQuery, filename: string): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(`${functionUrl(kind)}?${buildQueryString(params)}`, { headers });
  if (res.status === 402) throw new PremiumRequiredError();
  if (!res.ok) throw new Error(`${kind} failed: HTTP ${res.status}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const exportCsv = (params: EventsQuery) => downloadExport('export-csv', params, 'souba-calendar.csv');
export const exportPdf = (params: EventsQuery) => downloadExport('export-pdf', params, 'souba-calendar.pdf');

export async function gcalSync(params: EventsQuery): Promise<{ synced: number; total: number }> {
  const headers = await authHeaders();
  const res = await fetch(`${functionUrl('gcal-sync')}?${buildQueryString(params)}`, { method: 'POST', headers });
  if (res.status === 402) throw new PremiumRequiredError();
  if (res.status === 409) throw new Error('google_not_linked');
  if (!res.ok) throw new Error(`gcal-sync failed: HTTP ${res.status}`);
  return res.json();
}

export async function getVapidPublicKey(): Promise<string | null> {
  // Supabase's gateway requires an Authorization header (not just apikey) or
  // it 401s with UNAUTHORIZED_NO_AUTH_HEADER before the function even runs —
  // found while debugging why this always silently returned null.
  const headers = await authHeaders();
  const res = await fetch(functionUrl('push-subscribe'), { headers });
  if (!res.ok) return null;
  const body = await res.json();
  return body.publicKey ?? null;
}

export async function subscribePush(subscription: PushSubscriptionJSON): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(functionUrl('push-subscribe'), {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify(subscription),
  });
  if (!res.ok) throw new Error(`push-subscribe failed: HTTP ${res.status}`);
}

export async function unsubscribePush(endpoint: string): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(functionUrl('push-subscribe'), {
    method: 'DELETE',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify({ endpoint }),
  });
  if (!res.ok) throw new Error(`push-subscribe (delete) failed: HTTP ${res.status}`);
}

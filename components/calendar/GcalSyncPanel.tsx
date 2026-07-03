'use client';

import { useState } from 'react';
import { gcalSync, PremiumRequiredError } from '@/lib/api';
import { isoLocal } from '@/lib/dateFormat';
import { PALETTE, TYPE_LABEL_LONG } from '@/lib/palette';
import type { Country, FilterKey } from '@/lib/types';

const C = PALETTE;
const FILTER_KEYS: FilterKey[] = ['cb', 'econ', 'sq', 'div', 'holiday'];
const RANGE_OPTIONS = [
  { months: 1, label: '今後1ヶ月' },
  { months: 3, label: '今後3ヶ月' },
  { months: 6, label: '今後6ヶ月' },
  { months: 12, label: '今後12ヶ月' },
];

type SyncState = { kind: 'idle' } | { kind: 'syncing' } | { kind: 'done'; synced: number; total: number } | { kind: 'error'; message: string };

export default function GcalSyncPanel({ onNeedsPremium }: { onNeedsPremium: () => void }) {
  const [types, setTypes] = useState<Set<FilterKey>>(new Set(FILTER_KEYS));
  const [countries, setCountries] = useState<Set<Country>>(new Set(['JP', 'US']));
  const [months, setMonths] = useState(3);
  const [state, setState] = useState<SyncState>({ kind: 'idle' });

  const toggleType = (k: FilterKey) =>
    setTypes((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  const toggleCountry = (c: Country) =>
    setCountries((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  const runSync = async () => {
    if (types.size === 0 || countries.size === 0) {
      setState({ kind: 'error', message: 'カテゴリと国を少なくとも1つずつ選んでください。' });
      return;
    }
    setState({ kind: 'syncing' });
    const today = new Date();
    const to = new Date(today);
    to.setMonth(to.getMonth() + months);
    try {
      const result = await gcalSync({
        from: isoLocal(today),
        to: isoLocal(to),
        types: [...types],
        countries: [...countries],
      });
      setState({ kind: 'done', synced: result.synced, total: result.total });
    } catch (e) {
      if (e instanceof PremiumRequiredError) {
        onNeedsPremium();
        setState({ kind: 'idle' });
        return;
      }
      if (e instanceof Error && e.message === 'google_not_linked') {
        setState({ kind: 'error', message: 'Googleアカウントでログインしていないため連携できません。設定 → アカウントからGoogleでログインし直してください。' });
        return;
      }
      setState({ kind: 'error', message: '同期に失敗しました。時間をおいて再度お試しください。' });
    }
  };

  const checkboxRowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', color: C.textHi, cursor: 'pointer' };

  return (
    <div style={{ padding: '15px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <div style={{ fontSize: '11px', color: C.textLo, letterSpacing: '.06em', marginBottom: '8px' }}>同期する期間</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.months}
              onClick={() => setMonths(opt.months)}
              style={{
                padding: '6px 12px',
                borderRadius: '7px',
                border: `1px solid ${months === opt.months ? C.gold : C.border}`,
                background: months === opt.months ? '#fbf3e0' : '#fff',
                color: months === opt.months ? C.gold : C.textMid,
                fontSize: '12px',
                fontWeight: months === opt.months ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: C.textLo, letterSpacing: '.06em', marginBottom: '8px' }}>カテゴリ</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 16px' }}>
          {FILTER_KEYS.map((k) => (
            <label key={k} style={checkboxRowStyle}>
              <input type="checkbox" checked={types.has(k)} onChange={() => toggleType(k)} />
              <span style={{ width: '9px', height: '9px', borderRadius: '2px', background: C[k], display: 'inline-block' }} />
              {TYPE_LABEL_LONG[k]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: C.textLo, letterSpacing: '.06em', marginBottom: '8px' }}>国</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <label style={checkboxRowStyle}>
            <input type="checkbox" checked={countries.has('JP')} onChange={() => toggleCountry('JP')} />
            日本
          </label>
          <label style={checkboxRowStyle}>
            <input type="checkbox" checked={countries.has('US')} onChange={() => toggleCountry('US')} />
            米国
          </label>
        </div>
      </div>

      <button
        onClick={runSync}
        disabled={state.kind === 'syncing'}
        style={{
          padding: '10px',
          border: 'none',
          borderRadius: '8px',
          background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
          color: '#2a1e08',
          fontWeight: 700,
          fontSize: '13px',
          cursor: state.kind === 'syncing' ? 'default' : 'pointer',
          fontFamily: 'inherit',
          opacity: state.kind === 'syncing' ? 0.7 : 1,
        }}
      >
        {state.kind === 'syncing' ? '同期中…' : 'Googleカレンダー（メイン）に同期する'}
      </button>

      {state.kind === 'done' && (
        <div style={{ fontSize: '12px', color: C.div }}>
          {state.total}件中{state.synced}件を同期しました。
        </div>
      )}
      {state.kind === 'error' && <div style={{ fontSize: '12px', color: C.cb }}>{state.message}</div>}
    </div>
  );
}

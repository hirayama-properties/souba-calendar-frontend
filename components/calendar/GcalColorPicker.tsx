'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { PALETTE, TYPE_LABEL_LONG } from '@/lib/palette';
import { GCAL_COLORS, DEFAULT_GCAL_COLOR_MAP } from '@/lib/googleCalendarColors';
import type { EventType } from '@/lib/types';

const C = PALETTE;
const TYPES: EventType[] = ['cb', 'econ', 'sq', 'div', 'holiday'];

export default function GcalColorPicker() {
  const { profile, updateGcalColor } = useAuth();
  const [savingType, setSavingType] = useState<EventType | null>(null);

  const handlePick = async (type: EventType, colorId: string) => {
    setSavingType(type);
    try {
      await updateGcalColor(type, colorId);
    } catch (e) {
      console.error('[GcalColorPicker] failed to save color:', e);
    } finally {
      setSavingType(null);
    }
  };

  return (
    <div style={{ padding: '15px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '11px', color: C.textLo, letterSpacing: '.06em' }}>
        Googleカレンダー上での色分け（カテゴリごとに指定できます）
      </div>
      {TYPES.map((type) => {
        const selected = profile?.gcal_color_map?.[type] ?? DEFAULT_GCAL_COLOR_MAP[type];
        return (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: C.textHi }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '2px', background: C[type], display: 'inline-block' }} />
              {TYPE_LABEL_LONG[type]}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', opacity: savingType === type ? 0.6 : 1 }}>
              {GCAL_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handlePick(type, c.id)}
                  disabled={savingType !== null}
                  title={c.name}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: selected === c.id ? `2px solid ${C.textHi}` : '2px solid transparent',
                    boxShadow: selected === c.id ? `0 0 0 1px ${C.border}` : 'none',
                    cursor: savingType !== null ? 'default' : 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

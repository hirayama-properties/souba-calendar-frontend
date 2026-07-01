'use client';

import { PALETTE } from '@/lib/palette';

const C = PALETTE;

export function Toggle({ on, onToggle, disabled }: { on: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <div
      onClick={disabled ? undefined : onToggle}
      style={{
        width: '42px',
        height: '25px',
        borderRadius: '13px',
        background: on ? C.div : '#d8d0c4',
        position: 'relative',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'background .15s',
        flexShrink: 0,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: on ? '20px' : '3px',
          width: '19px',
          height: '19px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left .15s',
          boxShadow: '0 1px 2px rgba(40,33,20,.25)',
        }}
      />
    </div>
  );
}

export function SegmentedRow<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '3px', background: '#f1ece3', padding: '3px', borderRadius: '9px' }}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              minWidth: '60px',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              fontWeight: active ? 700 : 500,
              background: active ? '#ffffff' : 'transparent',
              color: active ? '#b07d2a' : '#6f6658',
              boxShadow: active ? '0 1px 2px rgba(40,33,20,.13)' : 'none',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

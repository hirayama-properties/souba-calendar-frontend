'use client';

import { useState } from 'react';
import { useCalendarState } from './CalendarStateContext';
import { PALETTE, MONO_FONT, hexA } from '@/lib/palette';

const C = PALETTE;
const FEATURES = [
  '翌月以降のカレンダーをすべて閲覧',
  'カレンダーをCSV・PDFで書き出し',
  'Googleカレンダーへ自動連携・同期',
  '絞り込み条件の保存・広告の非表示',
];

export default function PremiumModal() {
  const { premiumOpen, closePremium } = useCalendarState();
  const [comingSoon, setComingSoon] = useState(false);

  if (!premiumOpen) return null;

  return (
    <div
      onClick={closePremium}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(38,32,22,.42)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn .18s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(430px,100%)',
          background: '#ffffff',
          border: '1px solid #ecd9ad',
          borderRadius: '16px',
          padding: '28px 28px 26px',
          position: 'relative',
          animation: 'popIn .22s ease',
          boxShadow: '0 30px 80px rgba(40,33,20,.22)',
        }}
      >
        <button
          onClick={closePremium}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '30px',
            height: '30px',
            border: 'none',
            background: 'transparent',
            color: C.textMid,
            cursor: 'pointer',
            fontSize: '17px',
          }}
        >
          ✕
        </button>
        <div style={{ fontSize: '10.5px', color: C.gold, letterSpacing: '.22em', fontWeight: 700 }}>PREMIUM</div>
        <div style={{ fontSize: '21px', fontWeight: 700, marginTop: '9px', lineHeight: 1.45, color: C.textHi }}>
          すべての機能を、もっと便利に。
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '16px 0 18px' }}>
          <span style={{ fontFamily: MONO_FONT, fontSize: '34px', fontWeight: 600, color: C.textHi }}>
            <span style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}>¥</span>980
          </span>
          <span style={{ fontSize: '13px', color: C.textMid }}>/ 年（税込）</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '22px' }}>
          {FEATURES.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '13.5px', color: C.textHi }}>
              <span
                style={{
                  width: '19px',
                  height: '19px',
                  borderRadius: '50%',
                  background: hexA(C.gold, 0.16),
                  color: C.gold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              {f}
            </div>
          ))}
        </div>
        <button
          onClick={() => setComingSoon(true)}
          style={{
            width: '100%',
            padding: '13px',
            border: 'none',
            borderRadius: '9px',
            background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
            color: '#2a1e08',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          アップグレードする
        </button>
        <div style={{ textAlign: 'center', fontSize: '11px', color: C.textLo, marginTop: '11px' }}>
          {comingSoon ? '決済連携は近日対応予定です。もうしばらくお待ちください。' : '初月無料・いつでも解約可能'}
        </div>
      </div>
    </div>
  );
}

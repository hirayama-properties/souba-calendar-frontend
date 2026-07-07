'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCalendarState } from './CalendarStateContext';
import { useAuth } from '@/lib/useAuth';
import { exportCsv, exportPdf, PremiumRequiredError } from '@/lib/api';
import { isoLocal } from '@/lib/dateFormat';
import { PALETTE } from '@/lib/palette';

const C = PALETTE;

export default function TopBar() {
  const { year, month, prevMonth, nextMonth, goToday, isMobile, toggleSidebar, searchText, setSearchText, openPremium } =
    useCalendarState();
  const { isPremium } = useAuth();
  const [exporting, setExporting] = useState(false);

  const monthRange = () => {
    const from = isoLocal(new Date(year, month, 1));
    const to = isoLocal(new Date(year, month + 1, 0));
    return { from, to };
  };

  const handleExport = async (kind: 'csv' | 'pdf') => {
    if (!isPremium) {
      openPremium();
      return;
    }
    setExporting(true);
    try {
      const range = monthRange();
      if (kind === 'csv') await exportCsv(range);
      else await exportPdf(range);
    } catch (e) {
      if (e instanceof PremiumRequiredError) openPremium();
      else console.error('[TopBar] export failed:', e);
    } finally {
      setExporting(false);
    }
  };

  const menuBtnStyle: React.CSSProperties = {
    display: isMobile ? 'flex' : 'none',
    width: '34px',
    height: '34px',
    border: `1px solid ${C.border}`,
    background: '#ffffff',
    color: C.textMid,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const searchStyle: React.CSSProperties = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 12px',
    height: '32px',
    border: `1px solid ${C.border}`,
    background: C.cellAlt,
    borderRadius: '7px',
  };
  const navBtnStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    border: `1px solid ${C.border}`,
    background: '#ffffff',
    color: C.textMid,
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '8px' : '14px',
        padding: isMobile ? '10px 12px' : '13px 22px',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
        background: '#ffffff',
      }}
    >
      <button onClick={toggleSidebar} style={menuBtnStyle}>
        ☰
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button onClick={prevMonth} style={navBtnStyle}>
          ‹
        </button>
        <div
          style={{
            minWidth: isMobile ? '86px' : '128px',
            textAlign: 'center',
            fontSize: isMobile ? '14px' : '17px',
            fontWeight: 700,
            letterSpacing: '.02em',
            color: '#211e19',
            whiteSpace: 'nowrap',
          }}
        >
          {year}年 {month + 1}月
        </div>
        <button onClick={nextMonth} style={navBtnStyle}>
          ›
        </button>
        {!isMobile && (
          <button
            onClick={goToday}
            style={{
              marginLeft: '6px',
              padding: '0 14px',
              height: '32px',
              border: '1px solid #ecd9ad',
              background: '#fbf3e0',
              color: C.gold,
              borderRadius: '7px',
              cursor: 'pointer',
              fontSize: '12.5px',
              fontWeight: 700,
              fontFamily: 'inherit',
            }}
          >
            今日
          </button>
        )}
      </div>
      <div style={{ flex: 1 }} />
      <div style={searchStyle}>
        <span style={{ color: C.textLo, fontSize: '13px' }}>⌕</span>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="イベントを検索"
          style={{ background: 'transparent', border: 'none', outline: 'none', color: '#211e19', fontFamily: 'inherit', fontSize: '12.5px', width: '150px' }}
        />
      </div>
      {isMobile && (
        <button onClick={goToday} style={{ ...navBtnStyle, width: '32px', color: C.gold, borderColor: '#ecd9ad', background: '#fbf3e0', fontSize: '11px', fontWeight: 700 }}>
          今日
        </button>
      )}
      <button
        onClick={() => handleExport('csv')}
        disabled={exporting}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '4px' : '7px',
          padding: isMobile ? '0 8px' : '0 14px',
          height: '32px',
          border: `1px solid ${C.border}`,
          background: '#ffffff',
          color: C.textMid,
          borderRadius: '7px',
          cursor: exporting ? 'default' : 'pointer',
          fontSize: '12.5px',
          fontFamily: 'inherit',
          fontWeight: 500,
          opacity: exporting ? 0.6 : 1,
          flexShrink: 0,
        }}
      >
        <span>{isMobile ? 'CSV' : 'エクスポート'}</span>
        {!isPremium && (
          <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '.1em', color: '#2a1e08', background: C.goldSoft, padding: '2px 5px', borderRadius: '4px' }}>
            PRO
          </span>
        )}
      </button>
      {isPremium && !isMobile && (
        <button
          onClick={() => handleExport('pdf')}
          disabled={exporting}
          style={{
            padding: '0 12px',
            height: '32px',
            border: `1px solid ${C.border}`,
            background: '#ffffff',
            color: C.textMid,
            borderRadius: '7px',
            cursor: exporting ? 'default' : 'pointer',
            fontSize: '12.5px',
            fontFamily: 'inherit',
            fontWeight: 500,
            opacity: exporting ? 0.6 : 1,
          }}
        >
          PDF
        </button>
      )}
      <Link
        href="/calendar/settings"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '0' : '0 13px',
          width: isMobile ? '32px' : undefined,
          height: '32px',
          border: `1px solid ${C.border}`,
          background: '#ffffff',
          color: C.textMid,
          borderRadius: '7px',
          fontSize: isMobile ? '15px' : '12.5px',
          fontFamily: 'inherit',
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {isMobile ? '⚙' : '設定'}
      </Link>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useCalendarState } from './CalendarStateContext';
import { PALETTE } from '@/lib/palette';

const C = PALETTE;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isIosDevice(): boolean {
  const ua = window.navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  // iPadOS 13+ reports as "Macintosh" in the UA unless the user requests the
  // mobile site — multi-touch is the only reliable signal left to tell it
  // apart from an actual Mac.
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as { standalone?: boolean }).standalone === true;
}

/**
 * Chrome/Edge (desktop + Android) fire `beforeinstallprompt`, which we can
 * defer and trigger programmatically. iOS Safari never fires it — there is
 * no programmatic install API there, only the manual Share-sheet flow, so
 * that path just shows instructions instead.
 */
export default function InstallAppButton() {
  const { isMobile } = useCalendarState();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setIsIos(isIosDevice());

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return null;

  const handleClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setInstalled(true);
      setDeferredPrompt(null);
      return;
    }
    setShowHelp((v) => !v);
  };

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={handleClick}
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
          cursor: 'pointer',
          fontSize: '12.5px',
          fontFamily: 'inherit',
          fontWeight: 500,
        }}
      >
        <span style={{ fontSize: '13px', lineHeight: 1 }}>⬇</span>
        {!isMobile && <span>ホーム画面に追加</span>}
      </button>
      {showHelp && (
        <div
          style={{
            position: 'absolute',
            top: '38px',
            right: 0,
            zIndex: 50,
            width: '240px',
            background: '#ffffff',
            border: `1px solid ${C.border}`,
            borderRadius: '9px',
            padding: '14px 16px',
            boxShadow: '0 12px 30px rgba(40,33,20,.15)',
            fontSize: '12px',
            lineHeight: 1.7,
            color: C.textHi,
          }}
        >
          {isIos ? (
            <>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>ホーム画面に追加するには</div>
              共有ボタン <span style={{ fontWeight: 700 }}>⎋</span> をタップし、
              「ホーム画面に追加」を選んでください。
            </>
          ) : (
            <>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>ホーム画面に追加するには</div>
              ブラウザのメニューから「アプリをインストール」または「ホーム画面に追加」を選んでください。
            </>
          )}
          <button
            onClick={() => setShowHelp(false)}
            style={{ display: 'block', marginTop: '10px', marginLeft: 'auto', background: 'none', border: 'none', color: C.textMid, fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  );
}

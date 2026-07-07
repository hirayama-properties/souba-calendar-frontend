'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/lib/useAuth';
import { ADSENSE_CLIENT_ID } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One AdSense ad unit. Renders nothing (no request, no reserved space) when
 * there's no client id yet (pre-approval) or the viewer is premium — matches
 * the "プレミアムで広告非表示" promise already made in the LP/sidebar copy.
 */
export default function AdSlot({ slot, style }: { slot: string; style?: React.CSSProperties }) {
  const { isPremium } = useAuth();
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || isPremium || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error('[AdSlot] adsbygoogle push failed:', e);
    }
  }, [isPremium]);

  if (!ADSENSE_CLIENT_ID || isPremium) return null;

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

'use client';

import { useEffect } from 'react';

const CHUNK_ERROR_PATTERN = /ChunkLoadError|Loading chunk .* failed|Loading CSS chunk|failed to fetch dynamically imported module|error loading dynamically imported module/i;

// Reload at most once per short window, so a persistent (non-deploy-related)
// error can't trigger a reload loop.
const RELOAD_GUARD_KEY = 'stale-bundle-reload-at';
const RELOAD_GUARD_WINDOW_MS = 15_000;

function messageFrom(input: unknown): string {
  if (input instanceof Error) return input.message;
  if (typeof input === 'string') return input;
  return String(input ?? '');
}

/**
 * This is a static export deployed to Cloudflare Workers: every push replaces
 * the previous build's hashed JS chunk files. A browser tab left open across
 * a deploy still has the old chunk manifest in memory, so any subsequent
 * dynamic import (route/code-split chunk) 404s — the click that triggered it
 * just silently does nothing, looking like the page froze. Recovering
 * automatically is simpler than teaching users to hard-refresh.
 */
export default function StaleBundleRecovery() {
  useEffect(() => {
    const reloadOnce = () => {
      const lastReload = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) ?? 0);
      if (Date.now() - lastReload < RELOAD_GUARD_WINDOW_MS) return;
      sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => {
      if (CHUNK_ERROR_PATTERN.test(messageFrom(event.error ?? event.message))) reloadOnce();
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      if (CHUNK_ERROR_PATTERN.test(messageFrom(event.reason))) reloadOnce();
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}

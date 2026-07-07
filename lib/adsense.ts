// Unset until the AdSense account is approved and a real ca-pub-... id is
// added to Cloudflare's build environment variables — AdSlot renders nothing
// in that case, so this is safe to ship ahead of approval.
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || null;

// TODO: replace with real ad unit slot ids once created in the AdSense
// dashboard (Ads -> By ad unit -> Create ad unit, one per placement below).
// Placeholder ids are harmless pre-approval (AdSlot itself doesn't render
// anything until ADSENSE_CLIENT_ID is set), but must be real before ads
// will actually show once the account is live.
export const AD_SLOTS = {
  sidebar: '1234567890',
  settingsBottom: '1234567891',
} as const;

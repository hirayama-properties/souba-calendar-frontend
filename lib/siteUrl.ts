// Shared by app/layout.tsx (metadataBase), app/sitemap.ts, and app/robots.ts.
// See frontend/README.md's デプロイ section for how NEXT_PUBLIC_SITE_URL gets set.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://souba-calendar.com';

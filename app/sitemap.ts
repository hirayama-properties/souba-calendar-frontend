import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteUrl';

export const dynamic = 'force-static';

// /calendar/settings depends on signed-in account state and isn't a
// meaningful landing page for search, so it's excluded here — but /calendar
// itself is the actual product (freely viewable without login) and is worth
// indexing.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/calendar`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/login`, changeFrequency: 'monthly', priority: 0.3 },
  ];
}

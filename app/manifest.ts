import type { MetadataRoute } from 'next';

// Static export has no server at request time, so this must render to a
// fixed file at build time rather than per-request.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '相場カレンダー',
    short_name: '相場カレンダー',
    description: 'FOMC・日銀会合・米雇用統計・CPI・SQ・配当の権利日まで、日米の重要スケジュールを1つのカレンダーに集約。',
    start_url: '/calendar',
    display: 'standalone',
    background_color: '#fbfaf8',
    theme_color: '#fbfaf8',
    lang: 'ja',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  };
}

import type { Metadata } from 'next';
import { Noto_Sans_JP, IBM_Plex_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/useAuth';
import { SITE_URL } from '@/lib/siteUrl';
import './globals.css';

// Same families/weights as the prototype's Google Fonts <link> (相場カレンダー.dc.html
// lines 12-13), self-hosted via next/font instead of an external <link> request.
const notoSansJp = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

const TITLE = '相場カレンダー | 日米の政策会合・経済指標・SQ・配当日カレンダー';
const DESCRIPTION =
  'FOMC・日銀会合・米雇用統計・CPI・SQ・配当の権利日まで、日米の重要スケジュールを1つのカレンダーに集約。投資家のための無料カレンダーアプリです。';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | 相場カレンダー' },
  description: DESCRIPTION,
  keywords: ['相場カレンダー', 'FOMC', '日銀会合', '経済指標', 'CPI', 'SQ', '配当権利日', '投資カレンダー', '株式投資'],
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: '相場カレンダー',
    locale: 'ja_JP',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${ibmPlexMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

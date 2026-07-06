import type { Metadata } from 'next';
import { Noto_Sans_JP, IBM_Plex_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/useAuth';
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

// Falls back to the current production URL; set NEXT_PUBLIC_SITE_URL in the
// Cloudflare Worker's build environment variables instead of editing this
// file if/when a custom domain is added later.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://1d4b11e9-souba-calendar-frontend.hirayama-p-company.workers.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '相場カレンダー | Market Calendar',
  description: '日米の政策会合・経済指標・SQ・配当の予定を、投資家のために1画面に。',
  openGraph: {
    title: '相場カレンダー | Market Calendar',
    description: '日米の政策会合・経済指標・SQ・配当の予定を、投資家のために1画面に。',
    siteName: '相場カレンダー',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '相場カレンダー | Market Calendar',
    description: '日米の政策会合・経済指標・SQ・配当の予定を、投資家のために1画面に。',
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

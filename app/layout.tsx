import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Noto_Sans_JP, IBM_Plex_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/useAuth';
import { SITE_URL } from '@/lib/siteUrl';
import { ADSENSE_CLIENT_ID } from '@/lib/adsense';
import StaleBundleRecovery from '@/components/StaleBundleRecovery';
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
  other: {
    // AdSense's site-ownership check (separate from actually serving ads,
    // which stays off until NEXT_PUBLIC_ADSENSE_CLIENT_ID is set
    // post-approval — see lib/adsense.ts).
    'google-adsense-account': 'ca-pub-8054486833130306',
    // Next's `appleWebApp.capable` (below) only emits the unprefixed
    // `mobile-web-app-capable` tag — Safari didn't honor that until iOS
    // 17.4, so this vendor-prefixed one covers older iOS separately.
    'apple-mobile-web-app-capable': 'yes',
  },
  // iOS Safari ignores manifest.json entirely for "Add to Home Screen" —
  // these meta tags are what actually make the installed icon open without
  // Safari's browser chrome there (Android/desktop Chrome read the manifest
  // instead, via app/manifest.ts).
  appleWebApp: { capable: true, statusBarStyle: 'default', title: '相場カレンダー' },
};

export const viewport: Viewport = { themeColor: '#fbfaf8' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${ibmPlexMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif' }}>
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <StaleBundleRecovery />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

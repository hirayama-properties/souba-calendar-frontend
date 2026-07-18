import type { Metadata } from 'next';

// app/login/page.tsx is 'use client' (reads auth hooks), so it can't export
// `metadata` itself — this stays a plain Server Component to carry it.
export const metadata: Metadata = {
  title: 'ログイン',
  alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No server-only features used (auth/data access is all client-side fetch
  // to Supabase Edge Functions, no middleware/route handlers/next/image) —
  // static export lets this run on any static host (Cloudflare Pages) for
  // free instead of needing Vercel's paid tier for serverless compute.
  output: 'export',
};

export default nextConfig;

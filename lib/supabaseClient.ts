import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!url || !anonKey) {
  // Do not throw at import time (breaks the LP, which needs no backend) —
  // callers that actually need data will surface a clear error instead.
  console.warn(
    '[supabaseClient] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. ' +
      'Copy .env.local.example to .env.local and fill in the values from your Supabase project.',
  );
}

export const SUPABASE_URL = url;
export const SUPABASE_ANON_KEY = anonKey;

export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key');

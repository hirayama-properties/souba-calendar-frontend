'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import type { Profile } from './types';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isPremium: boolean;
  signInWithPassword: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signInWithGoogle: () => Promise<string | null>;
  signOut: () => Promise<void>;
  updateNotificationSettings: (
    patch: Partial<Pick<Profile, 'notify_enabled' | 'notify_min_importance'>>,
  ) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, is_premium, notify_enabled, notify_min_importance, current_period_end')
      .eq('id', userId)
      .maybeSingle();
    if (error) console.error('[auth] failed to load profile:', error);
    setProfile(data ?? null);
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        loadProfile(newSession.user.id);
        // Capture the Google Calendar refresh token once, right after a
        // Google sign-in that requested the calendar scope — Supabase only
        // attaches provider_refresh_token to the session at this moment (see
        // backend/README.md "フロントエンド側で今後実装が必要な連携ポイント").
        if (event === 'SIGNED_IN' && newSession.provider_refresh_token) {
          supabase
            .from('google_calendar_tokens')
            .upsert({ user_id: newSession.user.id, refresh_token: newSession.provider_refresh_token })
            .then(({ error }) => {
              if (error) console.error('[auth] failed to store google refresh token:', error);
            });
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return error?.message ?? null;
  };

  const signInWithGoogle = async () => {
    // signInWithOAuth navigates the browser away on success (no code after
    // this point runs); only the error case returns control to the caller.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar.events',
        queryParams: { access_type: 'offline', prompt: 'consent' },
        redirectTo: `${window.location.origin}/calendar`,
      },
    });
    if (error) {
      console.error('[auth] signInWithOAuth(google) failed:', error);
      return error.message;
    }
    return null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateNotificationSettings = async (
    patch: Partial<Pick<Profile, 'notify_enabled' | 'notify_min_importance'>>,
  ) => {
    if (!session?.user) return;
    const { error } = await supabase.from('profiles').update(patch).eq('id', session.user.id);
    if (error) throw error;
    setProfile((p) => (p ? { ...p, ...patch } : p));
  };

  const refreshProfile = async () => {
    if (session?.user) await loadProfile(session.user.id);
  };

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    isPremium: !!profile?.is_premium,
    signInWithPassword,
    signUp,
    signInWithGoogle,
    signOut,
    updateNotificationSettings,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import { PALETTE } from '@/lib/palette';

const C = PALETTE;

function tabBtnStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: '9px',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '13px',
    fontWeight: active ? 700 : 500,
    background: active ? '#ffffff' : 'transparent',
    color: active ? '#b07d2a' : '#6f6658',
    boxShadow: active ? '0 1px 2px rgba(40,33,20,.13)' : 'none',
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { signInWithPassword, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isLogin = mode !== 'signup';

  const submit = async () => {
    setBusy(true);
    setError(null);
    const err = isLogin ? await signInWithPassword(email, password) : await signUp(email, password);
    setBusy(false);
    if (err) setError(err);
    else router.push('/calendar');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#fbfaf8',
        fontFamily: 'var(--font-noto-sans-jp), sans-serif',
        color: '#211e19',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <div style={{ width: '100%', maxWidth: '404px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '11px', marginBottom: '26px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg,#d8ae5b,#b07d2a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fffdf7',
              fontSize: '18px',
            }}
          >
            相
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '.03em', lineHeight: 1.2 }}>相場カレンダー</div>
            <div style={{ fontSize: '9px', color: C.textLo, letterSpacing: '.16em', marginTop: '1px' }}>MARKET CALENDAR</div>
          </div>
        </Link>

        <div
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            background: '#fff',
            padding: '30px 28px',
            boxShadow: '0 1px 3px rgba(40,33,20,.05),0 18px 44px rgba(40,33,20,.06)',
          }}
        >
          <div style={{ display: 'flex', gap: '3px', background: '#f1ece3', padding: '4px', borderRadius: '10px', marginBottom: '22px' }}>
            <button onClick={() => setMode('login')} style={tabBtnStyle(isLogin)}>
              ログイン
            </button>
            <button onClick={() => setMode('signup')} style={tabBtnStyle(!isLogin)}>
              新規登録
            </button>
          </div>

          <button
            onClick={async () => {
              const err = await signInWithGoogle();
              if (err) setError(err);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '9px',
              padding: '12px',
              border: '1px solid #ddd6ca',
              borderRadius: '9px',
              background: '#fff',
              color: '#211e19',
              fontWeight: 600,
              fontSize: '13.5px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#4285f4,#34a853)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '11px',
              }}
            >
              G
            </span>
            Googleアカウントで続ける
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' }}>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
            <div style={{ fontSize: '11px', color: C.textLo }}>または</div>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
          </div>

          <div style={{ fontSize: '11.5px', fontWeight: 600, color: C.textMid, marginBottom: '7px' }}>メールアドレス</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '11px 13px',
              border: '1px solid #ddd6ca',
              borderRadius: '9px',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '13.5px',
              color: '#211e19',
              background: '#faf7f2',
            }}
          />

          <div style={{ fontSize: '11.5px', fontWeight: 600, color: C.textMid, margin: '16px 0 7px' }}>パスワード</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="8文字以上"
            style={{
              width: '100%',
              padding: '11px 13px',
              border: '1px solid #ddd6ca',
              borderRadius: '9px',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '13.5px',
              color: '#211e19',
              background: '#faf7f2',
            }}
          />

          {error && <div style={{ color: C.cb, fontSize: '12px', marginTop: '10px', lineHeight: 1.5 }}>{error}</div>}

          <button
            onClick={submit}
            disabled={busy}
            style={{
              width: '100%',
              marginTop: '22px',
              padding: '13px',
              border: 'none',
              borderRadius: '9px',
              background: 'linear-gradient(135deg,#d8ae5b,#b8842f)',
              color: '#2a1e08',
              fontWeight: 700,
              fontSize: '14px',
              cursor: busy ? 'default' : 'pointer',
              fontFamily: 'inherit',
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? '処理中…' : isLogin ? 'ログイン' : 'アカウントを作成'}
          </button>

          <p style={{ fontSize: '10.5px', lineHeight: 1.7, color: C.textLo, textAlign: 'center', margin: '14px 0 0' }}>
            続行することで、利用規約とプライバシーポリシーに
            <br />
            同意したものとみなされます。
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <Link href="/" style={{ fontSize: '12.5px', color: C.textMid }}>
            ← サイトトップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

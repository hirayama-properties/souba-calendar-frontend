'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCalendarState } from '@/components/calendar/CalendarStateContext';
import { useAuth } from '@/lib/useAuth';
import { Toggle, SegmentedRow } from '@/components/calendar/SettingsControls';
import GcalSyncPanel from '@/components/calendar/GcalSyncPanel';
import { createPortalSession } from '@/lib/api';
import { PALETTE, TYPE_LABEL_LONG } from '@/lib/palette';
import type { FilterKey } from '@/lib/types';

const C = PALETTE;
const FILTER_KEYS: FilterKey[] = ['cb', 'econ', 'sq', 'div', 'holiday'];

function formatPeriodEnd(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function SettingsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, toggleFilter, settings, setSetting, openPremium } = useCalendarState();
  const { user, isPremium, profile, signOut, refreshProfile } = useAuth();
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('checkout') !== 'success') return;
    refreshProfile();
    // Webhook may take a moment to land after the redirect back.
    const t = setTimeout(refreshProfile, 2000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const returnUrl = `${window.location.origin}/calendar/settings`;
      const { url } = await createPortalSession(returnUrl);
      window.location.href = url;
    } catch {
      setPortalLoading(false);
    }
  };

  const accountTitle = user ? user.email ?? 'ログイン中' : 'ゲストとして利用中';
  const accountSub = user ? 'ログイン中' : 'ログインすると通知・設定を保存できます';
  const authBtnLabel = user ? 'ログアウト' : 'ログイン';
  const handleAuthBtn = () => (user ? signOut() : router.push('/login'));

  const planLabel = isPremium ? 'プレミアム' : '無料プラン';
  const planBadgeStyle: React.CSSProperties = isPremium
    ? { fontSize: '10.5px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', color: '#2a1e08', background: 'linear-gradient(135deg,#d8ae5b,#b8842f)' }
    : { fontSize: '10.5px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', color: '#6f6658', background: '#f1ece3' };

  const sectionTitleStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 700, letterSpacing: '.14em', color: C.textLo, margin: '0 4px 10px' };
  const cardStyle: React.CSSProperties = { border: `1px solid ${C.border}`, borderRadius: '13px', background: '#fff', overflow: 'hidden' };
  const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', padding: '15px 18px', borderBottom: '1px solid #f1ece3' };

  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: '#fbfaf8', fontFamily: 'var(--font-noto-sans-jp), sans-serif', color: '#211e19', WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(251,250,248,.92)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            href="/calendar"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 13px', height: '34px', border: `1px solid ${C.border}`, background: '#fff', color: C.textMid, borderRadius: '8px', fontSize: '12.5px' }}
          >
            ← カレンダー
          </Link>
          <div style={{ fontSize: '16.5px', fontWeight: 700, letterSpacing: '.02em' }}>設定</div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '30px 24px 70px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
        <div>
          <div style={sectionTitleStyle}>アカウント</div>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{accountTitle}</div>
                <div style={{ fontSize: '11.5px', color: C.textLo, marginTop: '3px' }}>{accountSub}</div>
              </div>
              <button
                onClick={handleAuthBtn}
                style={{ whiteSpace: 'nowrap', padding: '8px 14px', border: '1px solid #ddd6ca', borderRadius: '8px', background: '#fff', color: C.textMid, fontWeight: 600, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {authBtnLabel}
              </button>
            </div>
            <div style={rowStyle}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>現在のプラン</div>
                {isPremium && profile?.current_period_end && (
                  <div style={{ fontSize: '11.5px', color: C.textLo, marginTop: '3px' }}>
                    次回更新日: {formatPeriodEnd(profile.current_period_end)}
                  </div>
                )}
              </div>
              <span style={planBadgeStyle}>{planLabel}</span>
            </div>
            {isPremium && (
              <div style={{ ...rowStyle, borderBottom: 'none' }}>
                <div style={{ fontSize: '12.5px', color: C.textMid, lineHeight: 1.6, flex: 1, minWidth: '200px' }}>
                  支払い方法の変更・解約はこちらから行えます。
                </div>
                <button
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                  style={{ whiteSpace: 'nowrap', padding: '9px 16px', border: '1px solid #ddd6ca', borderRadius: '8px', background: '#fff', color: C.textMid, fontWeight: 600, fontSize: '12.5px', cursor: portalLoading ? 'default' : 'pointer', opacity: portalLoading ? 0.7 : 1, fontFamily: 'inherit' }}
                >
                  {portalLoading ? '処理中...' : 'サブスクリプション管理'}
                </button>
              </div>
            )}
            {!isPremium && (
              <div style={{ ...rowStyle, borderBottom: 'none' }}>
                <div style={{ fontSize: '12.5px', color: C.textMid, lineHeight: 1.6, flex: 1, minWidth: '200px' }}>
                  翌月以降の閲覧・書き出し・連携を使うにはプレミアムが必要です。
                </div>
                <button
                  onClick={openPremium}
                  style={{ whiteSpace: 'nowrap', padding: '9px 16px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg,#d8ae5b,#b8842f)', color: '#2a1e08', fontWeight: 700, fontSize: '12.5px', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  アップグレード
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div style={sectionTitleStyle}>カレンダー表示</div>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>週の開始曜日</div>
              <SegmentedRow
                value={settings.weekStart}
                onChange={(v) => setSetting('weekStart', v)}
                options={[
                  { value: 'sun', label: '日曜' },
                  { value: 'mon', label: '月曜' },
                ]}
              />
            </div>
            <div style={rowStyle}>
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>時刻の表示</div>
              <SegmentedRow
                value={settings.timezone}
                onChange={(v) => setSetting('timezone', v)}
                options={[
                  { value: 'jst', label: '日本時間' },
                  { value: 'local', label: '現地時間' },
                ]}
              />
            </div>
            <div style={{ ...rowStyle, borderBottom: 'none' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>表示する最小重要度</div>
              <SegmentedRow
                value={settings.minImp}
                onChange={(v) => setSetting('minImp', v)}
                options={[
                  { value: 0, label: 'すべて' },
                  { value: 2, label: '★2以上' },
                  { value: 3, label: '★3のみ' },
                ]}
              />
            </div>
          </div>
        </div>

        <div>
          <div style={sectionTitleStyle}>表示するイベント</div>
          <div style={cardStyle}>
            {FILTER_KEYS.map((k, i) => (
              <div key={k} style={{ ...rowStyle, borderBottom: i < FILTER_KEYS.length - 1 ? '1px solid #f1ece3' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                  <span style={{ width: '11px', height: '11px', borderRadius: '3px', background: C[k] }} />
                  <span style={{ fontSize: '13.5px' }}>{TYPE_LABEL_LONG[k]}</span>
                </div>
                <Toggle on={filters[k]} onToggle={() => toggleFilter(k)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={sectionTitleStyle}>通知</div>
          <div style={cardStyle}>
            <div style={{ ...rowStyle, borderBottom: 'none', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>
                  重要イベントの前日通知
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.1em', color: '#6f6658', background: '#f1ece3', padding: '3px 7px', borderRadius: '5px', marginLeft: '8px' }}>
                    準備中
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: C.textLo, marginTop: '3px' }}>
                  現在開発中の機能です。近日公開予定。
                </div>
              </div>
              <Toggle on={false} onToggle={() => {}} disabled />
            </div>
          </div>
        </div>

        <div>
          <div style={sectionTitleStyle}>連携・データ書き出し</div>
          <div style={cardStyle}>
            {isPremium ? (
              <div style={{ borderBottom: '1px solid #f1ece3' }}>
                <div style={{ padding: '15px 18px 0', fontSize: '13.5px', fontWeight: 600 }}>Googleカレンダー連携</div>
                <div style={{ fontSize: '11.5px', color: C.textLo, padding: '4px 18px 0' }}>
                  お使いのGoogleカレンダー（メイン）に予定を追加します。
                </div>
                <GcalSyncPanel onNeedsPremium={openPremium} />
              </div>
            ) : (
              <div onClick={openPremium} style={{ ...rowStyle, cursor: 'pointer' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>Googleカレンダー連携</div>
                <ProBadge />
              </div>
            )}
            <div style={rowStyle}>
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>CSVで書き出し</div>
              {isPremium ? (
                <div style={{ fontSize: '11.5px', color: C.textLo }}>カレンダー画面上部の「エクスポート」から</div>
              ) : (
                <ProBadge />
              )}
            </div>
            <div style={{ ...rowStyle, borderBottom: 'none' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 600 }}>PDFで書き出し</div>
              {isPremium ? (
                <div style={{ fontSize: '11.5px', color: C.textLo }}>カレンダー画面上部の「PDF」から</div>
              ) : (
                <ProBadge />
              )}
            </div>
          </div>
        </div>

        <div>
          <div style={sectionTitleStyle}>その他</div>
          <div style={cardStyle}>
            <div style={rowStyle}>
              <div style={{ fontSize: '13.5px' }}>言語</div>
              <div style={{ fontSize: '12.5px', color: C.textMid }}>日本語</div>
            </div>
            <div style={{ ...rowStyle, borderBottom: 'none' }}>
              <div style={{ fontSize: '13.5px' }}>バージョン</div>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '12px', color: C.textLo }}>1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsPageInner />
    </Suspense>
  );
}

function ProBadge() {
  return (
    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.1em', color: '#2a1e08', background: '#d8ae5b', padding: '3px 7px', borderRadius: '5px' }}>
      PRO
    </span>
  );
}

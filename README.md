# 相場カレンダー フロントエンド

`相場カレンダー.dc.html`（Anthropic製「dc-runtime」プロトタイプ）の見た目・挙動を Next.js（App Router）で再現し、`../backend/` の Supabase Edge Functions に接続した本番フロントエンド。

## セットアップ

```
npm install
cp .env.local.example .env.local   # Supabaseプロジェクトの URL / anon key を記入
npm run dev
```

`backend/README.md` の手順（`db push` / `functions deploy` / `secrets set`）が完了していないと、イベント一覧・認証・エクスポート・カレンダー同期・通知はすべて動きません（LP の静的部分だけは表示できます）。

## 実装済み

- `/` … LP（サーバーコンポーネント。ヒーローの「今後の重要イベント」だけクライアント側で `events-api` を叩く）
- `/calendar` … 月表示カレンダー（サイドバー・フィルタ・検索・月送り・日付パネル）
- `/calendar/settings` … 表示設定・通知・アカウント・連携（プロトタイプ同様、サイドバー無しの全画面）
- `/login` … メール/パスワード + Google（カレンダー権限つき）

## プロトタイプからの主な変更点

- `view` state を実ルーティングに分割（`/`, `/calendar`, `/calendar/settings`, `/login`）。
- 選択中の日付は `?date=YYYY-MM-DD` に保持（共有・戻るボタンに対応）。
- 課金は未実装のため、「アップグレードする」ボタンは `is_premium` を書き換えず「近日対応予定」を表示するのみ。
- エクスポート・Googleカレンダー連携・Web Push は実際に `backend/` の Edge Functions を呼ぶ（プロトタイプは全てモック）。

## デプロイ

- **ホスティング**：Cloudflare Workers（静的アセット配信、`wrangler.jsonc` 参照）。GitHubリポジトリ
  （`hirayama-properties/souba-calendar-frontend`）に接続済みで、`main` へのpushで自動ビルド・デプロイされる。
  - Build command: `npm run build` / Deploy command: `npx wrangler deploy`
  - 環境変数（`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`）はCloudflareダッシュボードの
    Settings → Variables and secrets で設定（ビルド時にNext.jsへ埋め込まれるため、値を変えたら再デプロイが必要）。
- **本番URL**：`https://1d4b11e9-souba-calendar-frontend.hirayama-p-company.workers.dev`
- **`metadataBase`**：`app/layout.tsx` で `NEXT_PUBLIC_SITE_URL` 環境変数（未設定時は上記の本番URLにフォールバック）
  から解決している。OGP画像（`app/opengraph-image.tsx`）など相対パスの絶対URL解決に必要。
  **カスタムドメインを追加したら**、Cloudflareの環境変数に `NEXT_PUBLIC_SITE_URL` を新ドメインの値で追加して
  再デプロイするだけでよい（コード変更不要）。

## 未検証（バックエンドのデプロイ後に確認が必要）

- 実データでのカレンダー表示・無料/プレミアム閲覧制限
- Google連携（`signInWithGoogle` のスコープ・`google_calendar_tokens` への保存 → `gcal-sync`）
- Web Push 購読 → `notify-daily` からの実際の通知受信（`public/sw.js`）
- CSV/PDF エクスポートのダウンロード

`npx tsc --noEmit` / `npx eslint .` / `npm run build` はいずれもこのリポジトリの状態でパス済み。

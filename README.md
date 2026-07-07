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
- 「アップグレードする」ボタンは `stripe-checkout` を呼んでStripe Checkoutにリダイレクトする（`lib/api.ts` の `createCheckoutSession`）。設定画面の「サブスクリプション管理」は `stripe-portal` 経由でカスタマーポータルへ。
- エクスポート・Googleカレンダー連携・Web Push は実際に `backend/` の Edge Functions を呼ぶ（プロトタイプは全てモック）。

## デプロイ

- **ホスティング**：Cloudflare Workers（静的アセット配信、`wrangler.jsonc` 参照）。GitHubリポジトリ
  （`hirayama-properties/souba-calendar-frontend`）に接続済みで、`main` へのpushで自動ビルド・デプロイされる。
  - Build command: `npm run build` / Deploy command: `npx wrangler deploy`
  - 環境変数（`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`）はCloudflareダッシュボードの
    Settings → Variables and secrets で設定（ビルド時にNext.jsへ埋め込まれるため、値を変えたら再デプロイが必要）。
- **本番URL**：`https://souba-calendar.com`（カスタムドメイン、Xserverドメインで取得しネームサーバーをCloudflareに
  変更、Workerの「Domains」タブでカスタムドメインとして追加済み）。
  `https://souba-calendar-frontend.hirayama-p-company.workers.dev` は引き続き有効（フォールバック用）。
  （※ `<バージョンID>-souba-calendar-frontend...` のようにハッシュ接頭辞が付いたURLは、その特定バージョンに
  固定されたプレビューURLで、再デプロイしても更新されない。常に最新版を見るにはハッシュ接頭辞なしのURLを使うこと）。
- **`metadataBase`**：`app/layout.tsx` で `NEXT_PUBLIC_SITE_URL` 環境変数（Cloudflareの環境変数で
  `https://souba-calendar.com` に設定済み）から解決している。OGP画像（`app/opengraph-image.tsx`）など
  相対パスの絶対URL解決に必要。
- **Supabase Auth の URL Configuration**：Site URL / Redirect URLs を `https://souba-calendar.com` に
  更新済み（workers.dev時代の設定のままだとGoogleログインが失敗する——実際にこの順で発生し、修正した）。
  今後さらにドメインを追加/変更する場合はここも忘れず更新すること。

## 広告（Google AdSense）

`components/AdSlot.tsx` が無料プランのユーザーにのみ広告枠を表示する（`lib/adsense.ts` の
`ADSENSE_CLIENT_ID` が未設定の間は何も描画しない＝審査前でも安全にデプロイできる）。設置箇所：
- カレンダー画面のサイドバー（`components/calendar/Sidebar.tsx`、フィルタ一覧とプレミアム案内の間）
- 設定画面の最下部（`app/calendar/settings/page.tsx`）

**AdSense審査通過後にやること：**
1. Cloudflareの環境変数に `NEXT_PUBLIC_ADSENSE_CLIENT_ID`（`ca-pub-...`）を追加して再デプロイ
2. AdSenseダッシュボードで広告ユニットを作成し、`lib/adsense.ts` の `AD_SLOTS`（現在は仮のプレースホルダー値）を実際のスロットIDに差し替え
3. `public/ads.txt` を実際の値（`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`）で作成（AdSense側の「サイトの管理」に案内あり）

## 実プロジェクトでの検証状況

- ✅ 実データでのカレンダー表示・無料/プレミアム閲覧制限
- ✅ Google連携（`signInWithGoogle`）：本番ドメインへのデプロイ後、SupabaseのAuth設定（Site URL / Redirect URLs）が
  ローカル開発時の`localhost:3000`のままだったため一度ログインが失敗した。本番URLに更新して解決済み——
  カスタムドメインを追加した際も同様にこの設定を更新すること。
- ✅ Stripe決済（テストモード）：実際にテストカードで決済→プレミアム反映→カスタマーポータルでの解約まで確認済み。詳細は`backend/README.md`。
- ✅ CSV/PDF エクスポートのダウンロード
- Web Push 購読は`backend/README.md`記載の通りshelved（`npm:web-push`がDeno上で動作しないため）。

`npx tsc --noEmit` / `npx eslint .` / `npm run build` はいずれもこのリポジトリの状態でパス済み。

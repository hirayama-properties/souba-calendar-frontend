import type { Metadata } from 'next';
import LegalPage, { LegalHeading, LegalP } from '@/components/legal/LegalPage';

export const metadata: Metadata = { title: '特定商取引法に基づく表記' };

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', padding: '13px 0', borderBottom: '1px solid #f1ece3' }}>
      <div style={{ width: '140px', flexShrink: 0, fontSize: '13px', fontWeight: 700, color: '#211e19' }}>{label}</div>
      <div style={{ flex: 1, minWidth: '200px', fontSize: '13.5px', lineHeight: 1.8, color: '#6f6658' }}>{children}</div>
    </div>
  );
}

export default function TokushohoPage() {
  return (
    <LegalPage title="特定商取引法に基づく表記">
      <Row label="販売業者名">Hirayama Properties K.K.</Row>
      <Row label="運営責任者名">Hirayama Kazuo</Row>
      <Row label="所在地">〒136-0074 東京都江東区東砂7-1-1-317</Row>
      <Row label="電話番号">03-6631-6992</Row>
      <Row label="メールアドレス">hirayama.p.company@gmail.com</Row>
      <Row label="販売価格">プレミアムプラン　年額980円（税込）</Row>
      <Row label="商品代金以外の必要料金">
        なし（インターネット接続料金・通信料金等は、お客様のご負担となります）
      </Row>
      <Row label="支払時期・方法">
        クレジットカード決済（決済代行会社Stripe, Inc.を利用）。お申し込み時に即時課金され、以降は年に1度、自動更新のタイミングで課金されます。
      </Row>
      <Row label="サービス提供時期">決済完了後、直ちにプレミアムプランの機能をご利用いただけます。</Row>
      <Row label="キャンセル・返品・返金">
        いつでも解約（自動更新の停止）が可能です。解約手続きはサービス内の設定画面から行えます。解約後も、既にお支払いいただいた期間の終了までは引き続きプレミアムプランをご利用いただけます。デジタルコンテンツの性質上、日割り等での返金は行っておりません（法令に基づく場合を除く）。
      </Row>
      <Row label="動作環境">Webブラウザ（PC・スマートフォン対応）</Row>

      <div style={{ marginTop: '28px' }}>
        <LegalHeading>お問い合わせ</LegalHeading>
        <LegalP>本表記に関するお問い合わせは、上記メールアドレスまでお願いいたします。</LegalP>
      </div>
    </LegalPage>
  );
}

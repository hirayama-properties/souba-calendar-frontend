import type { Metadata } from 'next';
import LegalPage, { LegalHeading, LegalP } from '@/components/legal/LegalPage';

export const metadata: Metadata = { title: 'プライバシーポリシー' };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="プライバシーポリシー" updated="2026年7月3日">
      <LegalP>
        Hirayama Properties K.K.（以下「当社」）は、アプリケーション「相場カレンダー」（以下「本サービス」）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
      </LegalP>

      <LegalHeading>第1条（収集する個人情報の種類と収集方法）</LegalHeading>
      <LegalP>本サービスでは、以下の情報を取扱います。</LegalP>
      <LegalP>
        ■ メールアドレス
        <br />
        アカウント登録・ログイン（メールアドレスまたはGoogleアカウント）の際に取得します。
      </LegalP>
      <LegalP>
        ■ Googleアカウント情報
        <br />
        Googleアカウントでログインした場合、メールアドレス等の基本情報を取得します。Googleカレンダー連携機能を利用する場合は、カレンダーへ予定を追加するためのアクセストークンを取得し、当社のサーバーに保存します。このトークンはカレンダー同期の目的以外には使用しません。
      </LegalP>
      <LegalP>
        ■ ご利用状況に関する情報
        <br />
        プレミアムプランの利用状況、通知設定等、本サービスの提供に必要な設定情報を保存します。
      </LegalP>
      <LegalP>
        ■ 決済情報
        <br />
        プレミアムプランのお申し込みにあたり、決済代行会社（Stripe, Inc.）を通じてクレジットカード情報等の決済処理を行います。カード番号等の決済情報は当社のサーバーには保存されません。
      </LegalP>
      <LegalP>
        ■ 位置情報
        <br />
        本サービスはユーザーの位置情報を収集しません。
      </LegalP>

      <LegalHeading>第2条（個人情報の利用目的）</LegalHeading>
      <LegalP>
        当社が個人情報を収集・利用する目的は、以下のとおりです。
        <br />
        ・本サービスの認証およびアカウント管理
        <br />
        ・プレミアムプランの提供・管理（決済処理を含む）
        <br />
        ・Googleカレンダー連携機能の提供
        <br />
        ・本サービスの改善・向上のための分析
        <br />
        ・お問い合わせへの対応
        <br />
        ・利用規約に違反した利用の確認および利用停止
      </LegalP>

      <LegalHeading>第3条（個人情報の第三者提供について）</LegalHeading>
      <LegalP>
        当社は、法令に定める場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。なお、本サービスの提供にあたり、データベース・認証基盤としてSupabase
        Inc.のサービスを、カレンダー連携のためGoogle LLCの提供するサービスを、決済処理のためStripe,
        Inc.の提供するサービスを利用しています。
      </LegalP>

      <LegalHeading>第4条（個人情報の共同利用）</LegalHeading>
      <LegalP>当社は現時点では個人情報の共同利用は行っておりません。</LegalP>

      <LegalHeading>第5条（個人情報の内容の訂正・削除・利用停止等）</LegalHeading>
      <LegalP>
        当社は、ユーザー本人からの請求に基づき、個人情報の開示、訂正、削除、利用停止等に対応します。お問い合わせページよりリクエストください。
        <br />
        Googleカレンダー連携の解除は、Googleアカウントの設定（アクセス権のあるサードパーティ アプリ）からいつでも行うことができます。
      </LegalP>

      <LegalHeading>第6条（プライバシーポリシーの変更）</LegalHeading>
      <LegalP>
        本ポリシーの内容は、法令その他において有効な規定の形成を対象とするものを除き、ユーザーに通知することなく変更することができるものとします。変更後のプライバシーポリシーは、本サービス上に掲載した時点から有効となるものとします。
      </LegalP>

      <LegalHeading>第7条（お問い合わせ）</LegalHeading>
      <LegalP>本ポリシーに関するお問い合わせは、本サービス内のお問い合わせページよりお願いいたします。</LegalP>
    </LegalPage>
  );
}

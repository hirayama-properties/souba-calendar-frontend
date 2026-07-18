import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalHeading, LegalP } from '@/components/legal/LegalPage';
import AdSlot from '@/components/AdSlot';
import { AD_SLOTS } from '@/lib/adsense';
import { PALETTE } from '@/lib/palette';

const C = PALETTE;

export const metadata: Metadata = {
  title: 'FOMCとは｜開催日程・見るべきポイント',
  description: 'FOMC（連邦公開市場委員会）とは何か、開催スケジュール、政策金利発表が株価・為替に与える影響、投資家が確認すべきポイントを解説します。',
  alternates: { canonical: '/guide/fomc' },
};

export default function FomcGuidePage() {
  return (
    <LegalPage title="FOMCとは">
      <LegalP>
        FOMC（Federal Open Market Committee、連邦公開市場委員会）は、アメリカの中央銀行制度であるFRB（連邦準備制度）の中で、金融政策を決定する会合です。日本銀行の「金融政策決定会合」に相当し、アメリカの政策金利（フェデラルファンド金利の誘導目標）をどう動かすかを話し合います。
      </LegalP>
      <LegalP>
        年8回、原則として2日間の日程で開催されます。1日目は非公開の討議、2日目の会合終了後（現地時間14:00、日本時間では夏時間で翌3:00、冬時間で翌4:00ごろ）に政策金利の発表と声明文が公表され、その30分後にパウエル議長（FRB議長）の記者会見が行われます。
      </LegalP>

      <LegalHeading>何が発表されるのか</LegalHeading>
      <LegalP>
        中心となるのは政策金利の誘導目標です。据え置き・利上げ・利下げのいずれかが発表され、あわせて声明文で今後の金融政策運営の方針（インフレや雇用の情勢をどう見ているか）が示されます。年4回（3・6・9・12月）の会合では、参加者による政策金利見通し（通称「ドットチャート」）と経済見通し（GDP・失業率・インフレ率の予測）もあわせて公表されます。
      </LegalP>

      <LegalHeading>なぜ相場が動くのか</LegalHeading>
      <LegalP>
        政策金利は、為替（特にドル円）・米国株・債券利回りのすべてに影響します。金利が市場予想より高く（タカ派に）動けばドル高・株安に、逆に低く（ハト派に）動けばドル安・株高に振れやすくなります。実際の発表内容そのものより、「市場が事前に織り込んでいた予想とのズレ」が値動きの大きさを左右する点には注意が必要です。声明文の文言がわずかに変わるだけでも、市場が金融政策の先行きを読み直し、相場が大きく動くことがあります。
      </LegalP>

      <LegalHeading>投資家が見るべきポイント</LegalHeading>
      <LegalP>
        ①政策金利そのものの決定、②声明文における物価・雇用情勢の表現の変化、③ドットチャート（開催回による）、④記者会見での質疑応答、の4点が主な確認ポイントです。特に記者会見は、声明文だけでは読み取れない「次回以降の判断材料」に対するFRB議長の発言が出やすく、発表直後よりも会見中に相場が動くことも珍しくありません。
      </LegalP>

      <LegalHeading>相場カレンダーでの確認方法</LegalHeading>
      <LegalP>
        相場カレンダーでは、FOMC1日目・2日目（政策金利発表）をそれぞれ表示し、発表時刻は自動的に日本時間（JST）へ換算して掲載しています。夏時間・冬時間の切り替えも自動対応のため、「現地時間から自分で計算し直す」手間はありません。
      </LegalP>
      <div style={{ marginTop: '32px' }}>
        <Link
          href="/calendar"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '9px', background: 'linear-gradient(135deg,#d8ae5b,#b07d2a)', color: '#fffdf7', fontWeight: 700, fontSize: '13.5px' }}
        >
          次回のFOMCをカレンダーで確認する →
        </Link>
      </div>
      <div style={{ marginTop: '40px' }}>
        <AdSlot slot={AD_SLOTS.guideArticle} style={{ minHeight: '250px' }} />
      </div>
    </LegalPage>
  );
}

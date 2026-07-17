import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalHeading, LegalP } from '@/components/legal/LegalPage';
import AdSlot from '@/components/AdSlot';
import { AD_SLOTS } from '@/lib/adsense';

export const metadata: Metadata = {
  title: '配当の権利付き最終日・権利落ち日とは｜仕組みと注意点',
  description: '配当・株主優待を受け取るための権利付き最終日と権利落ち日の仕組み、決済サイクル、権利落ち後に株価が下がりやすい理由を解説します。',
};

export default function DividendGuidePage() {
  return (
    <LegalPage title="配当の権利付き最終日・権利落ち日とは">
      <LegalP>
        上場企業から配当金や株主優待を受け取るには、決算期末（権利確定日）の時点で、その会社の株主名簿に名前が記載されている必要があります。株式を買ってから株主名簿に反映されるまでには数営業日のタイムラグがあるため、「いつまでに買えば間に合うか」を表す日として「権利付き最終日」が使われます。
      </LegalP>

      <LegalHeading>権利付き最終日と権利落ち日</LegalHeading>
      <LegalP>
        日本株の決済（受渡）は、約定日から起算して2営業日後（T+2）に行われます。そのため、権利確定日から2営業日前が「権利付き最終日」となり、この日までに株式を買って保有していれば、配当・優待を受け取る権利が得られます。権利付き最終日の翌営業日は「権利落ち日」と呼ばれ、この日に株式を買っても、その期の配当・優待は受け取れません。
      </LegalP>

      <LegalHeading>権利落ち後に株価が下がりやすい理由</LegalHeading>
      <LegalP>
        配当を受け取る権利がなくなった株式は、理論上その配当額に相当する分だけ価値が下がるため、権利落ち日には株価が下落しやすい傾向があります。加えて、権利付き最終日までに配当・優待狙いで買われていた分の売り（いわゆる「配当取り」「優待取り」の利益確定売り）が権利落ち日以降に出やすく、需給面からも株価が下がりやすくなります。
      </LegalP>

      <LegalHeading>配当・優待取りで注意したいこと</LegalHeading>
      <LegalP>
        権利付き最終日の直前に買って権利落ち日にすぐ売却する、いわゆる「配当取り」「優待取り」は、権利落ちによる株価下落で値下がり益が相殺されてしまうことがあります。また配当金には約20%の税金がかかるため、値下がり幅と税負担を差し引くと必ずしも得になるとは限りません。権利日だけを見て売買を判断するのではなく、その銘柄自体の中期的な値動きも合わせて確認することが大切です。
      </LegalP>

      <LegalHeading>相場カレンダーでの確認方法</LegalHeading>
      <LegalP>
        相場カレンダーでは、決算月ごとの権利付き最終日・権利落ち日をあらかじめ掲載しています。狙っている銘柄の決算月がわかれば、権利日を逃さず確認できます。
      </LegalP>
      <div style={{ marginTop: '32px' }}>
        <Link
          href="/calendar"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '9px', background: 'linear-gradient(135deg,#d8ae5b,#b07d2a)', color: '#fffdf7', fontWeight: 700, fontSize: '13.5px' }}
        >
          今月の権利付き最終日をカレンダーで確認する →
        </Link>
      </div>
      <div style={{ marginTop: '40px' }}>
        <AdSlot slot={AD_SLOTS.guideArticle} style={{ minHeight: '250px' }} />
      </div>
    </LegalPage>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalHeading, LegalP } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'SQ（特別清算指数）とは｜メジャー・マイナーSQの違いと注意点',
  description: 'SQ（特別清算指数）とは何か、メジャーSQとマイナーSQの違い、算出日に値動きが荒くなりやすい理由と個人投資家が気をつけるべき点を解説します。',
};

export default function SqGuidePage() {
  return (
    <LegalPage title="SQ（特別清算指数）とは">
      <LegalP>
        SQ（Special Quotation、特別清算指数）とは、日経225先物・日経225オプションなど株価指数を対象とする先物・オプション取引の最終決済に使われる清算値です。「SQ算出日」は、その月の限月（げんげつ）を迎える先物・オプション取引が決済される日を指します。
      </LegalP>

      <LegalHeading>メジャーSQとマイナーSQ</LegalHeading>
      <LegalP>
        3月・6月・9月・12月は「メジャーSQ」と呼ばれ、先物とオプションの両方が同時に決済を迎えます。対象となる建玉（ポジション）が多く、決済にともなう売買が集中しやすいため、値動きが特に荒くなりやすい月です。それ以外の月（1・2・4・5・7・8・10・11月）は「マイナーSQ」で、オプションのみの決済となり、メジャーSQに比べると相場への影響は限定的です。いずれも算出日は、各月の第2金曜日です。
      </LegalP>

      <LegalHeading>SQ値はどう決まるのか</LegalHeading>
      <LegalP>
        SQ値は、算出日の日経225採用銘柄の「寄り付き（始値）」をもとに算出される特別な指数です。通常の終値ベースの日経平均とは異なり、あくまで「その日の寄り付き時点」の価格をベースにしている点が特徴です。
      </LegalP>

      <LegalHeading>なぜ算出日は値動きが荒くなりやすいのか</LegalHeading>
      <LegalP>
        SQ算出日が近づくと、機関投資家やヘッジファンドが保有する先物・オプションポジションの解消・乗り換えのための売買が増加します。特にメジャーSQでは、権利行使価格をめぐる需給（いわゆる「オプションの壁」）を意識した思惑的な売買が入りやすく、算出日の寄り付き前後で株価指数が普段以上に振れることがあります。
      </LegalP>

      <LegalHeading>個人投資家が気をつけたいこと</LegalHeading>
      <LegalP>
        SQ算出日そのものに新規でポジションを取る必要は基本的にありません。むしろ「この日は思惑的な値動きが出やすい」と事前に把握しておき、想定外の値動きに慌てて売買しないことが重要です。特に信用取引や先物・オプションで大きめのポジションを持っている場合は、SQ算出日前後のボラティリティ上昇を織り込んだ上でリスク管理をしておくと安心です。
      </LegalP>

      <LegalHeading>相場カレンダーでの確認方法</LegalHeading>
      <LegalP>
        相場カレンダーでは、メジャーSQ・マイナーSQをそれぞれ区別して掲載しています。カレンダー上でひと目で「今月がメジャーSQかどうか」を確認できるため、事前の心構えに役立ちます。
      </LegalP>
      <div style={{ marginTop: '32px' }}>
        <Link
          href="/calendar"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '9px', background: 'linear-gradient(135deg,#d8ae5b,#b07d2a)', color: '#fffdf7', fontWeight: 700, fontSize: '13.5px' }}
        >
          今月のSQ算出日をカレンダーで確認する →
        </Link>
      </div>
    </LegalPage>
  );
}

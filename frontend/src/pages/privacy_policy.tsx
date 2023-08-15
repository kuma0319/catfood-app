import Link from "next/link";

import RootLayout from "@/components/commons/Layout";
import { noto_jp } from "@/utils/font";

const PrivacyPolicy = () => {
  return (
    <RootLayout>
      <div className={noto_jp.className}>
        <div className="mx-auto max-w-screen-md p-4 text-sm">
          <h1 className="mb-4 text-lg font-bold text-gray-800">利用規約</h1>
          <p className="mb-6 text-gray-700">
            サイト運営者（以下，「当方」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）
            における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第1条（個人情報）
          </h2>
          <p className="mb-4 text-gray-700">
            「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，
            生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証
            の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第2条（個人情報を収集・利用する目的）
          </h2>
          <p className="mb-4 text-gray-700">
            本サービスが個人情報を収集・利用する目的は，以下のとおりです。
            <ol className="list-inside list-decimal pl-5">
              <li>本サービスの提供・運営のため</li>
              <li>
                ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
              </li>
              <li>
                ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び本サービスが提供する他のサービスの案内のメールを送付するため
              </li>
              <li>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
              <li>
                利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
              </li>
              <li>
                ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
              </li>
              <li>上記の利用目的に付随する目的</li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第3条（利用目的の変更）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                本サービスは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
              </li>
              <li>
                利用目的の変更を行った場合には，変更後の目的について，本サービス所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
              </li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第4条（個人情報の第三者提供）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                本サービスは，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その
                他の法令で認められる場合を除きます。
                <ol className="list-inside list-decimal pl-5">
                  <li>
                    人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき
                  </li>
                  <li>
                    国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得る
                    ことにより当該事務の遂行に支障を及ぼすおそれがあるとき
                  </li>
                  <li>
                    予め次の事項を告知あるいは公表し，かつ本サービスが個人情報保護委員会に届出をしたとき
                    <ol className="list-inside list-decimal pl-5">
                      <li>利用目的に第三者への提供を含むこと</li>
                      <li>第三者に提供されるデータの項目</li>
                      <li>第三者への提供の手段または方法</li>
                      <li>
                        本人の求めに応じて個人情報の第三者への提供を停止すること
                      </li>
                      <li>本人の求めを受け付ける方法</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
                <ol className="list-inside list-decimal pl-5">
                  <li>
                    本サービスが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                  </li>
                  <li>
                    合併その他の事由による事業の承継に伴って個人情報が提供される場合
                  </li>
                  <li>
                    個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者
                    の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合
                  </li>
                </ol>
              </li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第5条（個人情報の訂正および削除）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                ユーザーは，本サービスの保有する自己の個人情報が誤った情報である場合には，本サービスが定める手続きにより，本サービスに対して個人情報の訂正，
                追加または削除（以下，「訂正等」といいます。）を請求することができます。
              </li>
              <li>
                本サービスは，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。
              </li>
              <li>
                本サービスは，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
              </li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第6条（個人情報の利用停止等）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                本サービスは，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，
                その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
              </li>
              <li>
                前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
              </li>
              <li>
                本サービスは，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
              </li>
              <li>
                前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要な
                これに代わるべき措置をとれる場合は，この代替策を講じるものとします。
              </li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第7条（Cookiesとローカルストレージの利用）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                本サービスは、ユーザーの利便性向上やサービスの品質確保のために、Cookiesやローカルストレージを利用しています。
                これにより、ユーザーの利用状況の把握や、再度訪問した際の設定値の保存などを行います。
              </li>
              <li>
                ユーザーはブラウザの設定でCookiesやローカルストレージの利用を制限または無効にすることができますが、その場合、
                本サービスの一部の機能が制限される場合があります。
              </li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第8条（アクセス解析ツール）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                本サービスは、ユーザーの利用状況の把握やサービス向上のために、Googleアナリティクスを利用したアクセス解析を行っています。
              </li>
              <li>
                Googleアナリティクスは、アクセス情報をもとに統計データを提供しますが、個人を特定する情報を含むことはありません。
              </li>
              <li>
                Googleアナリティクスについて、詳細は
                <Link
                  href={
                    "https://marketingplatform.google.com/about/analytics/terms/jp/"
                  }
                  className="underline hover:text-blue-600"
                >
                  こちら
                </Link>
                からご確認下さい。
              </li>
            </ol>
          </p>
          <h2 className="mb-2 mt-4 text-base font-semibold text-gray-800">
            第9条（プライバシーポリシーの変更）
          </h2>
          <p className="mb-4 text-gray-700">
            <ol className="list-inside list-decimal pl-5">
              <li>
                本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
              </li>
              <li>
                本サービスが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
              </li>
            </ol>
          </p>
          <p className="flex justify-end text-gray-700">以上</p>
        </div>
      </div>
    </RootLayout>
  );
};

export default PrivacyPolicy;

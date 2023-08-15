import Image from "next/image";
import Link from "next/link";

import RootLayout from "@/components/commons/Layout";
import {
  IconParkSolidGoodTwo,
  MaterialSymbolsForumOutline,
  MdiScaleUnbalanced,
  PhHeartFill,
  PhMagnifyingGlassBold,
} from "@/utils/icon";

const GuidePage = () => {
  return (
    <RootLayout>
      <div className="mx-auto max-w-screen-md px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-6">
            <div className="relative mx-auto max-w-screen-md rounded border border-gray-300 bg-green-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800">
                「ねこまんま」とは
              </h2>
              <Image
                className=" absolute right-2 top-0 sm:right-10 sm:top-1 md:right-14 md:top-1"
                src="/cat-dish.png"
                alt="食事猫"
                width={70}
                height={70}
                unoptimized={true} // これが無いと透過するため
              />
              <p className="mt-3 text-gray-500">
                全ての猫ちゃんを飼われているおうちの方のための
                <span className="font-semibold text-orange-400">
                  キャットフード検索サービス
                </span>
                です。
              </p>
              <p className="mt-3 text-gray-500">
                ブランドや原産国だけでなく
                <span className="font-semibold text-orange-400">
                  成分量やカロリー、キーワードでも絞り込みが可能
                </span>
                です。猫ちゃんに合わせた最適なフードを探せます。
              </p>
            </div>

            <div className="space-y-6 lg:space-y-10">
              <div className="flex">
                <PhMagnifyingGlassBold className="mt-2 h-6 w-6 shrink-0 fill-gray-400" />
                <div className="ml-5 text-base sm:ml-8">
                  <h3 className="text-lg font-semibold text-gray-800  sm:text-lg">
                    キャットフードの探し方
                  </h3>
                  <p className="mt-1 text-gray-500">
                    <Link
                      href="/products/pages/1"
                      className="font-semibold text-orange-400 underline"
                    >
                      キャットフード一覧ページ
                    </Link>
                    の上部から
                    <span className="font-semibold text-orange-400">
                      ブランドで絞り込む、キーワードで絞り込む
                    </span>
                    などから検索したい条件を設定し、
                    <span className="font-semibold text-orange-400">
                      絞り込み検索ボタン
                    </span>
                    を押すと、お好みの条件で検索できます。
                  </p>
                </div>
              </div>

              <div className="flex">
                <MdiScaleUnbalanced className="mt-2 h-6 w-6 shrink-0 fill-blue-400" />
                <div className="ml-5 text-base sm:ml-8">
                  <h3 className="text-lg font-semibold text-gray-800  sm:text-lg">
                    気になったキャットフードを比較する
                  </h3>
                  <p className="mt-1 text-gray-500">
                    キャットフード一覧ページから気になったキャットフードの
                    <span className="font-semibold text-orange-400">
                      ウォッチリストに追加
                    </span>
                    ボタンを押します。
                  </p>
                  <p className="mt-1 text-gray-500">
                    追加したキャットフードは
                    <Link
                      href="/watch_list"
                      className="font-semibold text-orange-400 underline"
                    >
                      ウォッチリストページ
                    </Link>
                    でテーブル形式で比較出来ます。
                  </p>
                </div>
              </div>

              <div className="flex">
                <IconParkSolidGoodTwo className="mt-2 h-6 w-6 shrink-0 fill-purple-400" />
                <div className="ml-5 text-base sm:ml-8">
                  <h3 className="text-lg font-semibold text-gray-800  sm:text-lg">
                    キャットフードにレビューを付ける
                  </h3>
                  <p className="mt-1 text-gray-500">
                    キャットフードにはユーザー様の評価を付けられます。
                  </p>
                  <p className="mt-1 text-gray-500">
                    <span className="font-semibold text-orange-400">
                      フードの香り
                    </span>
                    や
                    <span className="font-semibold text-orange-400">
                      猫ちゃんの食い付き
                    </span>
                    などの、情報もキャットフードの選択には重要ですので、ご協力頂けますと幸いです。
                  </p>
                  <p className="mt-2 text-sm text-red-500">
                    ※レビュー機能のご利用にはアカウント登録が必要です。
                  </p>
                </div>
              </div>

              <div className="flex">
                <PhHeartFill className="mt-2 h-6 w-6 shrink-0 fill-red-400" />
                <div className="ml-5 text-base sm:ml-8">
                  <h3 className="text-lg font-semibold text-gray-800  sm:text-lg">
                    キャットフードをお気に入り登録する
                  </h3>
                  <p className="mt-1 text-gray-500">
                    キャットフードは
                    <span className="font-semibold text-orange-400">
                      お気に入り登録
                    </span>
                    出来ます。
                  </p>
                  <p className="mt-1 text-gray-500">
                    登録したキャットフードは
                    <Link
                      href="/my_page"
                      className="font-semibold text-orange-400 underline"
                    >
                      マイページ
                    </Link>
                    からいつでも確認出来るようになります。
                  </p>
                  <p className="mt-2 text-sm text-red-500">
                    ※お気に入り機能のご利用にはアカウント登録が必要です。
                  </p>
                </div>
              </div>

              <div className="flex">
                <MaterialSymbolsForumOutline className="mt-2 h-6 w-6 shrink-0 fill-green-400" />
                <div className="ml-5 text-base sm:ml-8">
                  <h3 className="text-lg font-semibold text-gray-800  sm:text-lg">
                    キャットフードについて相談する
                  </h3>
                  <p className="mt-1 text-gray-500">
                    キャットフードについて気になることは
                    <Link
                      href="/forum"
                      className="font-semibold text-orange-400 underline"
                    >
                      キャットフード相談所
                    </Link>
                    で質問出来ます。
                  </p>
                  <p className="mt-1 text-gray-500">
                    他の方の質問や回答も閲覧可能です。
                  </p>
                  <p className="mt-2 text-sm text-red-500">
                    ※質問や回答のご利用にはアカウント登録が必要です。閲覧は全ての方がご利用可能です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default GuidePage;

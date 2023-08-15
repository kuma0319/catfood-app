import Image from "next/image";

import RootLayout from "@/components/commons/Layout";

const About = () => {
  return (
    <RootLayout>
      <div className="mx-auto my-6 max-w-screen-md px-6">
        <div className="py-3">
          <h1 className="block py-6 text-xl font-bold text-gray-800">
            「ねこまんま」はキャットフードの検索サービスです。
          </h1>
          <p className="mt-3 text-base text-gray-800">
            猫ちゃんの飼い主の皆様、こんなことで悩んだことはありませんか？
          </p>
          <div className="flex items-center">
            <div className="mr-4 w-1/4">
              <Image
                className="rounded-md"
                src="/cat-hatena.png"
                alt="はてなマークをたくさん浮かべる猫"
                width={100}
                height={100}
              />
            </div>
            <div className="w-3/4">
              <p className="mt-3 rounded-lg border border-gray-300 p-4 text-sm font-semibold text-gray-600 shadow-md">
                「色んなサイトでおすすめされているフード、本当にいいのかな？」
              </p>
              <p className="mt-3 rounded-lg border border-gray-300 p-4 text-sm font-semibold text-gray-600 shadow-md">
                「種類が多すぎて比較が大変。。。」
              </p>
            </div>
          </div>
          <p className="mt-3 text-base text-gray-800">
            こんなお悩みを解決するためのサービスです。
          </p>
        </div>
        <div className="py-3">
          <p className="mt-3 text-base text-gray-800">
            例えばこんなことが出来ます。
          </p>
          <div className="flex items-center">
            <div className="w-3/4">
              <p className="mt-3 rounded-lg border border-gray-300 p-4 text-sm font-semibold text-orange-500 shadow-md">
                「たんぱく質量が多くて糖質が少ないフードだけ指定」
              </p>
              <p className="mt-3 rounded-lg border border-gray-300 p-4 text-sm font-semibold text-orange-500 shadow-md">
                「特定の原材料が入っているフードは除外」
              </p>
              <p className="mt-3 rounded-lg border border-gray-300 p-4 text-sm font-semibold text-orange-500 shadow-md">
                「似たようなフードについて一括比較」
              </p>
            </div>
            <div className="ml-4 w-1/4">
              <Image
                className="rounded-md"
                src="/cat-point.png"
                alt="チェックポーズの猫"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <p className="mt-3 text-base text-gray-800">
          「ねこまんま」は猫ちゃんの飼い主さんのキャットフード探しをサポートします。
        </p>
      </div>
    </RootLayout>
  );
};

export default About;

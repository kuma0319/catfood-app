import Script from "next/script";
import { FC } from "react";

// 参考サイト：https://maku.blog/p/zycmw6f/

// サーバーの環境変数で Google Analytics の測定 ID を指定
const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

/** Google Analytics によるアクセス解析を行うためのコンポーネント */
export const GoogleAnalytics: FC = () => {
  if (process.env.NODE_ENV !== "production") {
    // 開発サーバー上での実行 (next dev) では何も出力しない
    return <></>;
  }

  if (!ANALYTICS_ID) {
    console.warn("NEXT_PUBLIC_ANALYTICS_ID not defined");
    return <></>;
  }

  return (
    // 下記スクリプトの内容はGoogleアナリティクス公式のインストール手順のまま
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
        // afterInteractive(初期値): ページが表示された直後にロード
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
};

import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";

import { GoogleAnalytics } from "@/components/commons/GoogleAnalytics";
import { WatchListProvider } from "@/context/WatchListContext";

export default function App({ Component, pageProps }: AppProps) {
  //prelineはクライアントでのみインポート(※サーバー側でインポートするとエラー)
  useEffect(() => {
    import("preline");
  }, []);

  return (
    // ウォッチリストを共通化する用のcontext
    <WatchListProvider>
      {/* Googleアナリティクス用 */}
      <GoogleAnalytics />
      <Component {...pageProps} />
    </WatchListProvider>
  );
}

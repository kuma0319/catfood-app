import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  //prelineはクライアントでのみインポート(※サーバー側でインポートするとエラー)
  useEffect(() => {
    import("preline");
  }, []);

  return <Component {...pageProps} />;
}

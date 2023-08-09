import { Head, Html, Main, NextScript } from "next/document";

import { noto_jp } from "@/utils/font";

export default function Document() {
  return (
    <Html lang="en" className={noto_jp.className}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

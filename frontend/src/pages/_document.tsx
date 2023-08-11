import { Head, Html, Main, NextScript } from "next/document";

import { kiwi_maru } from "@/utils/font";

export default function Document() {
  return (
    <Html lang="en" className={kiwi_maru.className}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

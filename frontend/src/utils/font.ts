import { Kiwi_Maru, Noto_Sans_JP } from "next/font/google";

export const kiwi_maru = Kiwi_Maru({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

export const noto_jp = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

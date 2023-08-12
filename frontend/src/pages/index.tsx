import Image from "next/image";
import Link from "next/link";

import RootLayout from "@/components/commons/Layout";
import { kiwi_maru } from "@/utils/font";

export default function Home() {
  return (
    <RootLayout>
      <div
        className={`flex flex-col items-center justify-center ${kiwi_maru.className}`}
      >
        <div className="relative my-10 flex max-w-screen-md items-center justify-center">
          <Image
            src="/eat-catfood.jpg"
            alt="食事する猫"
            width={768}
            height={500}
          />
          <div className="absolute right-2 top-2 bg-white bg-opacity-60 p-3 text-right">
            <h2 className="text-sm font-bold md:text-base lg:text-lg">
              キャットフードの比較検討サービス
            </h2>
            <h3 className="mt-2 text-center text-sm font-semibold md:text-base lg:text-lg">
              ねこまんま
            </h3>
          </div>
        </div>
        <div className=" flex w-full max-w-lg justify-between space-y-2 px-2 md:max-w-screen-md md:px-6">
          <Link
            className="flex h-28 w-28 items-center justify-center rounded-full bg-sky-300 bg-gradient-to-r text-lg font-bold text-white shadow-lg hover:bg-sky-400 active:scale-90 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 lg:text-2xl"
            href="/products"
          >
            ご飯を探す
          </Link>
          <Link
            className="flex h-28 w-28 items-center justify-center rounded-full bg-red-300 bg-gradient-to-r text-lg font-bold text-white shadow-lg hover:bg-red-400 active:scale-90 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 lg:text-2xl"
            href="/forum"
          >
            相談所
          </Link>
          <Link
            className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-300 bg-gradient-to-r text-lg font-bold text-white shadow-lg hover:bg-emerald-400 active:scale-90 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 lg:text-2xl"
            href="/guide"
          >
            使い方を見る
          </Link>
        </div>
      </div>
    </RootLayout>
  );
}

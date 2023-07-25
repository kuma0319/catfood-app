import Image from "next/image";
import Link from "next/link";

import RootLayout from "@/components/commons/Layout";

export default function Home() {
  return (
    <RootLayout>
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="relative mb-10 flex w-full items-center justify-center">
          <Image
            src="/eat-catfood.jpg"
            alt="食事する猫"
            width={700}
            height={500}
          />
          <div className="absolute right-44 top-4 rounded-bl bg-white bg-opacity-60 p-3 text-right">
            <h2 className="text-2xl font-bold">
              キャットフードの比較検討サービス
            </h2>
            <h3 className="mt-2 text-center text-2xl font-semibold">
              CatFood App(仮称)
            </h3>
          </div>
        </div>
        <div className="mb-10 flex w-3/4 justify-between">
          <Link
            className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-pink-300 via-red-300 to-orange-300 text-2xl font-bold text-white hover:from-pink-400 hover:to-orange-400"
            href="/products"
          >
            ご飯を探す
          </Link>
          <Link
            className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 text-2xl font-bold text-white hover:from-blue-400 hover:to-indigo-400"
            href="/forum"
          >
            相談所
          </Link>
          <Link
            className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-green-300 via-teal-300 to-cyan-300 text-2xl font-bold text-white hover:from-green-400 hover:to-cyan-400"
            href="#"
          >
            使い方を見る
          </Link>
        </div>
      </div>
    </RootLayout>
  );
}

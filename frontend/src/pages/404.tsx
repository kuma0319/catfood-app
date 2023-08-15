import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mx-auto px-4 py-10 text-center">
      <Image
        src="/cat-sorry.png"
        alt="焦った表情でおじぎをする猫"
        width={200}
        height={200}
        className="mx-auto my-10"
      />
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="my-6 text-2xl text-gray-800">
        お探しのページは見つかりませんでした
      </p>
      <Link
        href="/"
        className="font-medium text-blue-600 decoration-2 hover:underline"
      >
        ホームへ移動する場合はこちら
      </Link>
    </div>
  );
}

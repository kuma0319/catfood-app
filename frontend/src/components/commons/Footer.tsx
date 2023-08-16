import Link from "next/link";

import { Fa6BrandsSquareXTwitter, IonLogoGithub } from "@/utils/icon";

const Footer = () => {
  return (
    <div className="bg-white pt-4 text-xs sm:pt-10  md:text-sm lg:pt-12 lg:text-base">
      <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center border-t pt-6">
          <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
            <Link
              href="/about"
              className="text-gray-500 transition duration-100 hover:text-blue-500 active:text-blue-600"
            >
              ねこまんまについて
            </Link>
            <Link
              href="/privacy_policy"
              className="text-gray-500 transition duration-100 hover:text-blue-500 active:text-blue-600"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 transition duration-100 hover:text-blue-500 active:text-blue-600"
            >
              利用規約
            </Link>
            <Link
              href="/inquiry"
              className="text-gray-500 transition duration-100 hover:text-blue-500 active:text-blue-600"
            >
              お問い合わせ
            </Link>
          </nav>

          <div className="flex gap-4">
            <Link href={process.env.X_URL ? process.env.X_URL : "#"}>
              <Fa6BrandsSquareXTwitter className="fill-gray-400 hover:fill-gray-500 active:fill-gray-600" />
            </Link>

            <Link href={process.env.GITHUB_URL ? process.env.GITHUB_URL : "#"}>
              <IonLogoGithub className="fill-gray-400 hover:fill-gray-500 active:fill-gray-600" />
            </Link>
          </div>
        </div>

        <div className="py-8 text-center text-gray-400">© 2023 - Nekomanma</div>
      </footer>
    </div>
  );
};

export default Footer;

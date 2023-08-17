import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";

import { authSignOutUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

import SuccessToast from "./SuccessToast";

const HeaderOnSignIn = () => {
  const [flashMessage, setFlashMessage] = useState("");
  const cookies = parseCookies();
  const router = useRouter();

  // マウント時にフラッシュメッセージがqueryで存在していればそれをセット
  useEffect(() => {
    setFlashMessage(
      typeof router.query.flashMessage === "string"
        ? router.query.flashMessage
        : ""
    );
  }, []);

  // フラッシュメッセージ表示用の副作用
  useEffect(() => {
    if (flashMessage !== "") {
      const timer = setTimeout(() => {
        setFlashMessage("");
      }, 3000); // 3秒後にメッセージを消す
      return () => clearTimeout(timer); // コンポーネントがアンマウントされたときにタイマーをクリア
    }
  }, [flashMessage]);

  // ログアウト用の関数
  const handleSignOut = async () => {
    try {
      // クッキーに存在するトークン情報を元にsign_outパスでログアウト処理
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authSignOutUrl}`,
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 200) {
        // Promisesを利用して、非同期でクッキー削除を待ってからリダイレクト
        // ∵こうしておかないと、クッキーが削除されないままリダイレクトされることがある。
        Promise.all([
          destroyCookie(null, "uid", cookies["uid"]),
          destroyCookie(null, "client", cookies["client"]),
          destroyCookie(null, "access-token", cookies["access-token"]),
        ]).then(() => {
          router.push({
            pathname: "/",
            query: { flashMessage: "ログアウトしました" },
          });
        });
      }
    } catch (error: any) {
      setFlashMessage(error.response);
    }
  };

  return (
    <div className="relative">
      <header className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-2 text-sm   md:flex-nowrap md:justify-start md:py-0">
        <nav
          className="relative mx-auto w-full max-w-7xl px-4 md:flex md:items-center md:justify-between md:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Brand">
              <Image
                src="/cat-banner.png"
                alt="サイトバナー"
                width={192}
                height={64}
              />
            </Link>
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white      "
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="h-4 w-4 hs-collapse-open:hidden"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hidden h-4 w-4 hs-collapse-open:block"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"
          >
            <div className="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:gap-x-7 md:gap-y-0 md:pl-7">
              <Link
                href="/"
                className="font-medium text-gray-500 hover:text-gray-400   md:py-6"
                aria-current="page"
              >
                ホーム
              </Link>
              <Link
                href="/products/pages/1"
                className="font-medium text-gray-500 hover:text-gray-400   md:py-6"
              >
                フード一覧
              </Link>
              <Link
                href="/forum"
                className="font-medium text-gray-500 hover:text-gray-400   md:py-6"
              >
                相談所
              </Link>
              <Link
                href="/guide"
                className="font-medium text-gray-500 hover:text-gray-400   md:py-6"
              >
                使い方
              </Link>
              <Link
                href="/watch_list"
                className="font-medium text-gray-500 hover:text-gray-400   md:py-6"
              >
                ウォッチリスト
              </Link>

              <div className="items-center gap-x-2 md:ml-auto md:flex">
                {/* ログイン状態の場合はマイページ用のリンクを配置 */}
                <Link
                  className="flex items-center py-2 font-medium text-gray-500 hover:text-gray-400  "
                  href="/my_page"
                >
                  マイページ
                </Link>
                <button
                  // ログイン状態の場合はログアウト用のボタンを配置
                  className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-gray-400  "
                  onClick={() => {
                    if (window.confirm("ログアウトしますか？")) {
                      handleSignOut();
                    }
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* ログイン後に表示するフラッシュメッセージ */}
      <div className="absolute right-4">
        {flashMessage && <SuccessToast message={flashMessage} />}
      </div>
    </div>
  );
};

export default HeaderOnSignIn;

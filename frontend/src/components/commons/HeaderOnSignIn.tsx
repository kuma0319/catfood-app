import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";

import { authSignOutUrl } from "@/urls";

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
          headers: {
            "access-token": cookies["access-token"],
            client: cookies["client"],
            uid: cookies["uid"],
          },
        }
      );
      if (response.status === 200) {
        // ログアウト成功時に該当するクッキーを削除しリダイレクト
        destroyCookie(null, "uid", cookies["uid"]);
        destroyCookie(null, "client", cookies["client"]);
        destroyCookie(null, "access-token", cookies["access-token"]);
        router.push({
          pathname: "/",
          query: { flashMessage: "ログアウトしました" },
        });
      }
    } catch (error: any) {
      setFlashMessage(error.response);
    }
  };

  return (
    <div className="relative">
      <header className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
        <nav
          className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex-none text-xl font-semibold dark:text-white"
              aria-label="Brand"
            >
              CatFood App
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-white p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
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
            className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
          >
            <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-x-7 sm:gap-y-0 sm:pl-7">
              <Link
                href="/"
                className="font-medium text-blue-600 dark:text-blue-500 sm:py-6"
                aria-current="page"
              >
                ホーム
              </Link>
              <Link
                href="/products"
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
              >
                フード一覧
              </Link>
              <Link
                href="/#"
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
              >
                相談所
                <br />
                (製作中)
              </Link>
              <Link
                href="/#"
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
              >
                使い方
                <br />
                (製作中)
              </Link>
              <Link
                href="/watch_list"
                className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
              >
                ウォッチリスト
              </Link>

              {/* <div className="hs-dropdown [--adaptive:none] [--strategy:static] sm:py-4 sm:[--strategy:fixed] sm:[--trigger:hover]">
              <button
                type="button"
                className="flex w-full items-center font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 "
              >
                Dropdown
                <svg
                  className="ml-2 h-2.5 w-2.5 text-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>

              <div className="hs-dropdown-menu top-full z-10 hidden rounded-lg bg-white p-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:left-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 sm:w-48 sm:border sm:shadow-md sm:duration-[150ms] sm:dark:border">
                <a
                  className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  About
                </a>
                <div className="hs-dropdown relative [--adaptive:none] [--strategy:static] sm:[--trigger:hover] sm:[--strategy:absolute]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    Sub Menu
                    <svg
                      className="ml-2 h-2.5 w-2.5 text-gray-600 sm:-rotate-90"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>

                  <div className="hs-dropdown-menu right-full top-0 z-10 !mx-[10px] hidden rounded-lg bg-white p-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-right-5 before:top-0 before:h-full before:w-5 hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 sm:mt-2 sm:w-48 sm:border sm:shadow-md sm:duration-[150ms] sm:dark:border">
                    <a
                      className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      About
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      Downloads
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      href="#"
                    >
                      Team Account
                    </a>
                  </div>
                </div>

                <a
                  className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Downloads
                </a>
                <a
                  className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Team Account
                </a>
              </div>
            </div> */}

              <div className="flex items-center gap-x-2 sm:ml-auto">
                {/* ログイン状態の場合はマイページ用のリンクを配置 */}
                <Link
                  className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                  href="my_page"
                >
                  マイページ
                </Link>
                <button
                  // ログイン状態の場合はログアウト用のボタンを配置
                  className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                  onClick={handleSignOut}
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

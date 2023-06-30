import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { UserProps } from "@/pages/my_page";
import { authUrl } from "@/urls";

const EditProfile = ({
  handleEditButton,
  props,
}: {
  handleEditButton: (boolState: boolean) => void;
  props: UserProps;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    criteriaMode: "all",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onProfileEdit = async (data) => {
    const nickname = data.nickname;
    const email = data.email;
    const password = data.password;
    const cookies = parseCookies();

    console.log(nickname);
    console.log(email);

    const requestBody = {
      ...(email && { email }),
      ...(nickname && { nickname }),
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        requestBody,
        {
          headers: {
            Accept: "application/json",
            "access-token": cookies["access-token"],
            client: cookies["client"],
            "Content-Type": "application/json",
            uid: cookies["uid"],
          },
        }
      );
      if (response.status === 200) {
        setCookie(null, "uid", response.headers["uid"]);
        setCookie(null, "client", response.headers["client"]);
        setCookie(null, "access-token", response.headers["access-token"]);
        window.location.reload();
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      console.log(error.response);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-7">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              プロフィール編集ページ
            </h2>
          </div>
          {/* 登録エラーの場合にエラーメッセージを表示する */}
          <div className="text-center text-lg text-red-600">{errorMessage}</div>

          <form onSubmit={handleSubmit(onProfileEdit)}>
            <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200">
                  プロフィール画像
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Image
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="/public/eat-catfood.jpg"
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
                  <div className="flex gap-x-2">
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <svg
                          className="h-3 w-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                        画像のアップロード
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
                >
                  ニックネーム
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-full-name"
                    type="text"
                    className="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
                    placeholder={props.user.nickname}
                    {...register("nickname")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
                >
                  メールアドレス
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="email"
                  placeholder={props.user.email}
                  className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ${
                    errors.email
                      ? "border-red-500" //エラー発生時は枠線を赤くハイライト
                      : "border-gray-200"
                  }`}
                  {...register("email", {
                    pattern: {
                      message: "メールアドレスの形式を確認してください",
                      value:
                        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                    },
                  })}
                />
                {/* エラーが存在する場合にメッセージを下段に表示 */}
                {errors.email && (
                  <div className="mt-2 text-xs text-red-600">
                    {String(errors.email.message)}
                  </div>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
                >
                  パスワード
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-password"
                    type="text"
                    className="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                    placeholder="Enter current password"
                  />
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                onClick={() => handleEditButton(false)}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

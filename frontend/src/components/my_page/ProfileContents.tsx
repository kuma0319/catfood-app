import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { UserProps } from "@/pages/my_page";

const ProfileContents = ({
  errorMessage,
  handleDeleteAccount,
  onProfileEdit,
  profileProps,
  setAvatar,
}: {
  errorMessage: string;
  handleDeleteAccount: () => Promise<void>;
  onProfileEdit: (data: { nickname: string }) => Promise<void>;
  profileProps: UserProps;
  setAvatar: Dispatch<SetStateAction<File | null>>;
}) => {
  // React Hook Formを使用
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ nickname: string }>({
    criteriaMode: "all",
  });
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const router = useRouter();

  return (
    <div className="px-4 py-10 lg:py-14">
      <div className="rounded-xl bg-white py-4 shadow dark:bg-slate-900 sm:py-7">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            プロフィール
          </h2>
        </div>
        <div className="text-center text-lg text-red-600">{errorMessage}</div>

        <form onSubmit={handleSubmit(onProfileEdit)}>
          <div className="grid gap-2 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <label className="mt-2.5 inline-block text-base text-gray-800 dark:text-gray-200">
                プロフィール画像
              </label>
            </div>

            <div className="md:col-span-6">
              <div className="flex items-center gap-5">
                <Image
                  className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={
                    profileProps.user.avatar_url
                      ? profileProps.user.avatar_url
                      : "/cat_default_avatar_5416936.png"
                  }
                  alt="Image Description"
                  width={160}
                  height={160}
                />
                {isEditingAvatar ? (
                  <div>
                    <input
                      type="file"
                      className="inline-flex w-72 items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      // ファイルをアップロード時にstateに保存
                      onChange={(event) => {
                        if (event.target.files) {
                          setAvatar(event.target.files[0]);
                        }
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="md:col-span-3">
              {isEditingAvatar ? (
                <div>
                  <button
                    type="button"
                    className="mr-4 inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    onClick={() => setIsEditingAvatar(false)}
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
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => setIsEditingAvatar(true)}
                >
                  プロフィール画像変更
                </button>
              )}
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="af-account-nickname"
                className="mt-2.5 inline-block text-base text-gray-800 dark:text-gray-200"
              >
                ニックネーム
              </label>
            </div>

            <div className="md:col-span-6">
              {isEditingNickname ? (
                <div className="md:flex">
                  <input
                    id="af-account-full-name"
                    type="text"
                    className="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
                    placeholder={profileProps.user.nickname}
                    {...register("nickname")}
                  />
                </div>
              ) : (
                <div className="block w-full px-3 py-2 pr-11 text-base dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400">
                  {profileProps.user.nickname}
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              {isEditingNickname ? (
                <div>
                  <button
                    type="button"
                    className="mr-4 inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    onClick={() => setIsEditingNickname(false)}
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
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => setIsEditingNickname(true)}
                >
                  ニックネームの変更
                </button>
              )}
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="af-account-nickname"
                className="mt-2.5 inline-block text-base text-gray-800 dark:text-gray-200"
              >
                メールアドレス
              </label>
            </div>

            <div className="md:col-span-6">
              <div className="block w-full px-3 py-2 pr-11 text-base dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400">
                {profileProps.user.email}
              </div>
            </div>

            <div className="md:col-span-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={() => router.push("/auth/change_email")}
              >
                メールアドレスの変更
              </button>
            </div>
          </div>

          <div className="mt-20 flex justify-end gap-x-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={() => {
                if (
                  window.confirm(
                    `本当にアカウントを削除しますか？\nこの操作は取り消し出来ません。`
                  )
                ) {
                  handleDeleteAccount();
                }
              }}
            >
              アカウント削除はこちらをクリック
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileContents;

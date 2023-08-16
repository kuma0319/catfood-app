import axios from "axios";
import router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";

import AuthLayout from "@/components/commons/AuthLayout";
import CommonMeta from "@/components/commons/CommonMeta";
import Spinners from "@/components/commons/Spinners";
import { authUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

const ChangeEmail = () => {
  // React Hook Formライブラリを使用
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ email: string }>({
    criteriaMode: "all",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = async (data: { email: string }) => {
    const email = data.email;
    const cookies = parseCookies();

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        {
          email: email,
        },
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      // 更新成功時はページリロード
      if (response.status === 200) {
        // メール認証を促すページへpushし、クッキーは削除しログアウト状態にしておく
        destroyCookie(null, "uid", cookies["uid"]);
        destroyCookie(null, "client", cookies["client"]);
        destroyCookie(null, "access-token", cookies["access-token"]);
        setIsLoading(false);
        router.push({
          pathname: "/auth/confirm_request",
          query: { confirm_request_flag: true },
        });
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.error);
      console.log(error.response);
      setIsLoading(false);
    }
  };

  const meta_title = "ねこまんま | メールアドレス変更";
  const meta_description = "ねこまんまのメールアドレスの変更申請ページです。";

  return (
    <>
      <CommonMeta title={meta_title} description={meta_description} />
      <div className="h-screen bg-gray-100 ">
        <AuthLayout>
          {isLoading && <Spinners />}
          <div className="h-full">
            <div className="h-full items-center bg-gray-100 py-16 ">
              <div className="mx-auto w-full max-w-md p-6">
                {/* 登録エラーの場合にエラーメッセージを表示する */}
                <div className="text-center text-lg text-red-600">
                  {errorMessage}
                </div>
                <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm  ">
                  <div className="p-4 sm:p-7">
                    <div className="text-center">
                      <h1 className="block text-2xl font-bold text-gray-800 ">
                        メールアドレスの変更
                      </h1>
                      <p className="mt-2 text-sm text-gray-600 ">
                        新しいEメールアドレスを入力して下さい。再設定用のメールを送信します。
                        この操作を行うと自動的にログアウトします。
                      </p>
                    </div>

                    <div className="mt-5">
                      <form onSubmit={handleSubmit(onChangeEmail)}>
                        <div className="grid gap-y-4">
                          <div>
                            <label
                              htmlFor="email"
                              className="mb-2 block text-sm "
                            >
                              新しいEメールアドレス
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500    ${
                                  errors.email
                                    ? "border-red-500" //エラー発生時は枠線を赤くハイライト
                                    : "border-gray-200"
                                }`}
                                {...register("email", {
                                  pattern: {
                                    message:
                                      "メールアドレスの形式を確認してください",
                                    value:
                                      /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                                  },
                                  required: {
                                    message: "入力が必須の項目です",
                                    value: true,
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
                          </div>

                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                          >
                            確認メールを送信
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthLayout>
      </div>
    </>
  );
};

export default ChangeEmail;

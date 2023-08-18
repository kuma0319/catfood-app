import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { SignInInput } from "@/pages/auth/sign_in";

const SignInForm = ({
  errorMessage,
  onGuestSignIn,
  onSignIn,
  rememberMe,
  setRememberMe,
}: {
  errorMessage: string;
  onGuestSignIn: () => Promise<void>;
  onSignIn: (data: SignInInput) => Promise<void>;
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
}) => {
  // React Hook Formライブラリを使用
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInInput>({
    criteriaMode: "all",
  });

  return (
    <div className="h-full items-center bg-gray-100">
      <div className="mx-auto w-full max-w-md p-6">
        {/* 登録エラーの場合にエラーメッセージを表示する */}
        <div className="text-center text-lg text-red-600">{errorMessage}</div>
        <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm  ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                ログイン
              </h1>
              <p className="mt-2 text-sm text-gray-600 ">
                まだアカウントをお持ちでないですか？
                <Link
                  className="font-medium text-blue-600 decoration-2 hover:underline"
                  href="/auth/sign_up"
                >
                  こちらから新規登録
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSignIn)}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm ">
                      Eメールアドレス
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
                            message: "メールアドレスの形式を確認してください",
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

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="mb-2 block text-sm ">
                        パスワード
                      </label>
                      <Link
                        className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                        href="/auth/forgot_password"
                      >
                        パスワードをお忘れですか？
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500    ${
                          errors.email
                            ? "border-red-500" //エラー発生時は枠線を赤くハイライト
                            : "border-gray-200"
                        }`}
                        aria-describedby="password-error"
                        {...register("password", {
                          minLength: {
                            message: "6文字以上必要です",
                            value: 6,
                          },
                          required: {
                            message: "入力が必須の項目です",
                            value: true,
                          },
                        })}
                      />
                      {errors.password && (
                        <div className="mt-2 text-xs text-red-600">
                          {String(errors.password.message)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500     "
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="remember-me" className="text-sm ">
                        ログイン状態を保持する
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                  >
                    ログイン
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="m-6 flex justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-600">
            <button type="button" onClick={onGuestSignIn}>
              ゲストユーザーでお試しログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

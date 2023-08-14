import Link from "next/link";
import { useForm } from "react-hook-form";

interface SignUpProps {
  errorMessage: string;
  onSignUp: (event: any) => Promise<void>;
}

const SignUpForm = ({ errorMessage, onSignUp }: SignUpProps) => {
  // React Hook Formライブラリを使用
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({
    criteriaMode: "all",
  });

  return (
    <div className="flex h-full items-center bg-gray-100">
      <div className="mx-auto w-full max-w-md p-6">
        {/* 登録エラーの場合にエラーメッセージを表示する */}
        <div className="text-center text-lg text-red-600">{errorMessage}</div>
        <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                新規登録
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                既にアカウントをお持ちですか？
                <Link
                  className="font-medium text-blue-600 decoration-2 hover:underline"
                  href="/auth/sign_in"
                >
                  こちらからログイン
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSignUp)}>
                {/* ニックネーム用フォーム */}
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="nickname"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      ニックネーム
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="nickname"
                        className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ${
                          errors.nickname
                            ? "border-red-500" //エラー発生時は枠線を赤くハイライト
                            : "border-gray-200"
                        }`}
                        {...register("nickname", {
                          maxLength: {
                            message: "50文字以下で入力して下さい",
                            value: 50,
                          },
                          required: {
                            message: "入力が必須の項目です",
                            value: true,
                          },
                        })}
                      />
                      {/* エラーが存在する場合にメッセージを下段に表示 */}
                      {errors.nickname && (
                        <div className="mt-2 text-xs text-red-600">
                          {String(errors.nickname.message)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* メールアドレス用フォーム */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      Eメールアドレス
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
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

                  {/* パスワード用フォーム */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      パスワード
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ${
                          errors.password
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

                  {/* パスワード確認用フォーム */}
                  <div>
                    <label
                      htmlFor="passwordConfirmation"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      パスワード(確認用)
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="passwordConfirmation"
                        className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        aria-describedby="password-error"
                        {...register("passwordConfirmation", {
                          required: {
                            message: "入力が必須の項目です",
                            value: true,
                          },
                          validate: (value) =>
                            value === getValues("password") ||
                            "パスワードが一致しません",
                        })}
                      />
                      {errors.passwordConfirmation && (
                        <div className="mt-2 text-xs text-red-600">
                          {String(errors.passwordConfirmation.message)}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    登録
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

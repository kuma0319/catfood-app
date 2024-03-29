import { useForm } from "react-hook-form";

const ResetPasswordForm = ({
  errorMessage,
  onResetPassword,
}: {
  errorMessage: string;
  onResetPassword: (data: any) => Promise<void>;
}) => {
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
    <div className="h-full">
      <div className="flex h-full items-center bg-gray-100 py-16 ">
        <div className="mx-auto w-full max-w-md p-6">
          {/* 登録エラーの場合にエラーメッセージを表示する */}
          <div className="text-center text-lg text-red-600">{errorMessage}</div>
          <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm  ">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 ">
                  パスワードリセットフォーム
                </h1>
                <p className="mt-2 text-sm text-gray-600 ">
                  新しいパスワードを入力してください。
                </p>
              </div>

              <div className="mt-5">
                <form onSubmit={handleSubmit(onResetPassword)}>
                  <div className="grid gap-y-4">
                    {/* パスワード用フォーム */}
                    <div>
                      <label htmlFor="password" className="mb-2 block text-sm ">
                        パスワード
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500    ${
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
                        className="mb-2 block text-sm "
                      >
                        パスワード(確認用)
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="passwordConfirmation"
                          className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500    ${
                            errors.passwordConfirmation
                              ? "border-red-500" //エラー発生時は枠線を赤くハイライト
                              : "border-gray-200"
                          }`}
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
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                    >
                      パスワードリセット
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

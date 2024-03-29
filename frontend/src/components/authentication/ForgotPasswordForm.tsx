import { useForm } from "react-hook-form";

const ForgotPasswordForm = ({
  errorMessage,
  onForgotPassword,
}: {
  errorMessage: string;
  onForgotPassword: (data: { email: string }) => Promise<void>;
}) => {
  // React Hook Formライブラリを使用
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ email: string }>({
    criteriaMode: "all",
  });

  return (
    <div className="h-full items-center bg-gray-100">
      <div className="mx-auto w-full max-w-md p-6">
        {/* 登録エラーの場合にエラーメッセージを表示する */}
        <div className="text-center text-lg text-red-600">{errorMessage}</div>
        <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                パスワードアシスタント
              </h1>
              <p className="mt-2 text-sm text-gray-600 ">
                アカウントに関連付けられているEメールアドレスを入力して下さい。再設定用のメールを送信します。
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onForgotPassword)}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm ">
                      Eメールアドレス
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className={`block w-full rounded-md px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500  ${
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

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                  >
                    パスワードリセット用のメールを送信
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

export default ForgotPasswordForm;

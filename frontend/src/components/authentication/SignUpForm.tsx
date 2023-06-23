import Link from "next/link";

interface SignUpProps {
  handleLogin: (event: any) => Promise<void>;
}

const SignUpForm = ({ handleLogin }) => {
  return (
    <div>
      <div className="h-full">
        <div className="flex h-full items-center bg-gray-100 py-16 dark:bg-slate-900">
          <div className="mx-auto w-full max-w-md p-6">
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
                      href="sign_in"
                    >
                      こちらからログイン
                    </Link>
                  </p>
                </div>

                <div className="mt-5">
                  {/* <!-- Form --> */}
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-y-4">
                      {/* <!-- Form Group --> */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm dark:text-white"
                        >
                          メールアドレス
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            required
                            aria-describedby="email-error"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="mt-2 hidden text-xs text-red-600"
                          id="email-error"
                        >
                          Please include a valid email address so we can get
                          back to you
                        </p>
                      </div>
                      {/* <!-- End Form Group --> */}

                      {/* <!-- Form Group --> */}
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
                            name="password"
                            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            required
                            aria-describedby="password-error"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="mt-2 hidden text-xs text-red-600"
                          id="password-error"
                        >
                          8+ characters required
                        </p>
                      </div>
                      {/* <!-- End Form Group --> */}

                      {/* <!-- Form Group --> */}
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="mb-2 block text-sm dark:text-white"
                        >
                          確認用パスワード
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            required
                            aria-describedby="confirm-password-error"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="mt-2 hidden text-xs text-red-600"
                          id="confirm-password-error"
                        >
                          Password does not match the password
                        </p>
                      </div>
                      {/* <!-- End Form Group --> */}

                      {/* <!-- Checkbox --> */}
                      <div className="flex items-center">
                        <div className="flex">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="pointer-events-none mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3">
                          <label
                            htmlFor="remember-me"
                            className="text-sm dark:text-white"
                          >
                            I accept the{" "}
                            <Link
                              className="font-medium text-blue-600 decoration-2 hover:underline"
                              href="#"
                            >
                              Terms and Conditions
                            </Link>
                          </label>
                        </div>
                      </div>
                      {/* <!-- End Checkbox --> */}

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        登録
                      </button>
                    </div>
                  </form>
                  {/* <!-- End Form --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

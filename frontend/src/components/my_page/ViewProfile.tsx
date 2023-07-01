import { UserProps } from "@/pages/my_page";

const ViewProfile = ({
  handleEditAccount,
  props,
}: {
  handleEditAccount: (boolState: boolean) => void;
  props: UserProps;
}) => {
  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-7">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              プロフィール
            </h2>
          </div>

          <form>
            <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200">
                  プロフィール画像
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  {/* Next/Imageを使用するとエラーとなるため一時的に回避 */}
                  <img
                    className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                    src={
                      props.user.avatar_url
                        ? props.user.avatar_url
                        : "/kkrn_icon_user_1.svg"
                    }
                    alt="Image Description"
                    width={160}
                    height={160}
                  />
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
                <div className="sm:flex">{props.user.nickname}</div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
                >
                  メールアドレス
                </label>
              </div>

              <div className="sm:col-span-9">{props.user.email}</div>
            </div>

            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                onClick={() => handleEditAccount(true)}
              >
                プロフィールの編集
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

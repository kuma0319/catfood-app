import Profile from "./Profile";

const MyPageTabs = () => {
  return (
    <div>
      <nav
        className="relative z-0 flex overflow-hidden rounded-xl border dark:border-gray-700"
        aria-label="Tabs"
        role="tablist"
      >
        <button
          type="button"
          className="active relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:border-b-gray-700 dark:border-l-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-400 dark:hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white"
          id="bar-with-underline-item-1"
          data-hs-tab="#bar-with-underline-1"
          aria-controls="bar-with-underline-1"
          role="tab"
        >
          プロフィール
        </button>
        <button
          type="button"
          className="relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:border-b-gray-700 dark:border-l-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-400 dark:hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white"
          id="bar-with-underline-item-2"
          data-hs-tab="#bar-with-underline-2"
          aria-controls="bar-with-underline-2"
          role="tab"
        >
          お気に入りリスト
        </button>
        <button
          type="button"
          className="relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:border-b-gray-700 dark:border-l-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-400 dark:hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white"
          id="bar-with-underline-item-3"
          data-hs-tab="#bar-with-underline-3"
          aria-controls="bar-with-underline-3"
          role="tab"
        >
          レビュー一覧
        </button>
      </nav>

      <div className="mt-3">
        <div
          id="bar-with-underline-1"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-1"
        >
          <Profile />
        </div>
        <div
          id="bar-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-2"
        >
          <p className="text-gray-500 dark:text-gray-400">
            This is the{" "}
            <em className="font-semibold text-gray-800 dark:text-gray-200">
              second
            </em>{" "}
            item's tab body.
          </p>
        </div>
        <div
          id="bar-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-3"
        >
          <p className="text-gray-500 dark:text-gray-400">
            This is the{" "}
            <em className="font-semibold text-gray-800 dark:text-gray-200">
              third
            </em>{" "}
            item's tab body.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPageTabs;

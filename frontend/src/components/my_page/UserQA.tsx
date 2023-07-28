const UserQA = () => {
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
          id="bar-with-underline-item-5"
          data-hs-tab="#bar-with-underline-5"
          aria-controls="bar-with-underline-5"
          role="tab"
        >
          質問
        </button>
        <button
          type="button"
          className="relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:border-b-gray-700 dark:border-l-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-400 dark:hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white"
          id="bar-with-underline-item-6"
          data-hs-tab="#bar-with-underline-6"
          aria-controls="bar-with-underline-6"
          role="tab"
        >
          回答
        </button>
      </nav>

      <div className="mt-2">
        <div
          id="bar-with-underline-5"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-5"
        >
          質問
        </div>
        <div
          id="bar-with-underline-6"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-6"
        >
          回答
        </div>
      </div>
    </div>
  );
};

export default UserQA;

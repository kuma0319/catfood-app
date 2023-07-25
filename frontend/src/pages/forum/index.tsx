import axios from "axios";
import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import QuestionIndex from "@/components/forum/QuestionIndex";
import { MinimumUserInfo } from "@/types/user";
import { questionIndexUrl } from "@/urls";

export interface Questions {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: MinimumUserInfo;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}${questionIndexUrl}`
    );

    // エラー無い場合はレスポンスのデータを返す
    const props = await response.data;
    return { props };
  } catch (error: any) {
    // Rails側で401エラーが発生した場合はリダイレクト
    if (error.response.status === 401) {
      return {
        redirect: {
          destination: "/auth/sign_in",
          permanent: false,
        },
      };
    }
    throw error;
  }
};

const Forum = (props: { questions: Questions[] }) => {
  console.log(props);

  return (
    <RootLayout>
      <div className="flex justify-center p-4">
        <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800">
          質問してみる
        </button>
      </div>
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
          回答受付中の質問
        </button>
        <button
          type="button"
          className="relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:border-b-gray-700 dark:border-l-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-400 dark:hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white"
          id="bar-with-underline-item-2"
          data-hs-tab="#bar-with-underline-2"
          aria-controls="bar-with-underline-2"
          role="tab"
        >
          解決済み
        </button>
      </nav>

      <div className="mt-2">
        <div
          id="bar-with-underline-1"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-1"
        >
          <QuestionIndex props={props} />
        </div>
        <div
          id="bar-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-2"
        >
          タブ２
        </div>
      </div>
    </RootLayout>
  );
};

export default Forum;

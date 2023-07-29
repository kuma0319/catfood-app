import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

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
  const router = useRouter();
  const cookies = parseCookies();

  const goToPostQuestionPage = () => {
    if (cookies["access-token"]) {
      router.push({
        pathname: "/forum/question_form",
        query: { question_flag: true },
      });
    } else {
      router.push({
        pathname: "/auth/sign_in",
      });
    }
  };

  return (
    <RootLayout>
      <div className="relative mx-auto max-w-screen-md bg-white px-4 py-6 sm:py-8 md:px-8 lg:py-12">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">
          キャットフード相談所
        </h2>
        <Image
          className="absolute right-0 top-0"
          src="/cat-hatena.jpg"
          alt="はてな猫"
          width={180}
          height={180}
        />
        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
          キャットフードに関する疑問や悩みを質問してみませんか？
        </p>
        <div className="flex justify-center p-4">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
            onClick={() => {
              goToPostQuestionPage();
            }}
          >
            質問してみる
          </button>
        </div>
        <QuestionIndex props={props} />
      </div>
    </RootLayout>
  );
};

export default Forum;

import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import RootLayout from "@/components/commons/Layout";
import Spinners from "@/components/commons/Spinners";
import { questionsUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

interface QuestionInput {
  title: string;
  content: string;
}

const QuestionForm = () => {
  // React Hook Formライブラリを使用
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<QuestionInput>({
    criteriaMode: "all",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const cookies = parseCookies();

  const onPostQuestion = async (data: QuestionInput) => {
    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${questionsUrl}`,
        {
          title: data.title,
          content: data.content,
        },
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 201) {
        await router.push(`/forum`);
        setIsLoading(false);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage("投稿エラー");
      console.log(error.response);
      setIsLoading(false);
    }
  };

  // このページに直接アクセスした際の対策
  useEffect(() => {
    // routerを待ってからで無いと問答無用でリダイレクトされてしまうため必要
    if (router.isReady) {
      const question_flag = router.query.question_flag;
      // URLパラメータに特定のフラグ(question_flag)が無いとホームへリダイレクト
      if (question_flag !== "true") {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <RootLayout>
      {isLoading && <Spinners />}
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* エラーの場合にエラーメッセージを表示する */}
        <div className="text-center text-lg text-red-600">{errorMessage}</div>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white sm:text-3xl">
              質問を投稿
            </h2>
          </div>

          <div className="relative z-10 mt-5 rounded-xl border bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:mt-10 md:p-10">
            <form onSubmit={handleSubmit(onPostQuestion)}>
              <div className="my-4 gap-2 border-gray-400 py-5">
                <label
                  htmlFor="hs-feedback-post-comment-name-1"
                  className="mb-3 block text-lg font-bold dark:text-white lg:text-xl"
                >
                  質問のタイトル
                </label>
                <input
                  type="text"
                  id="hs-feedback-post-comment-name-1"
                  className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:p-4"
                  placeholder="質問の内容を端的に説明して下さい。"
                  {...register("title", {
                    maxLength: {
                      message: "100文字以下で記載してください。",
                      value: 100,
                    },
                    required: {
                      message: "入力が必須の項目です",
                      value: true,
                    },
                  })}
                />
                {/* エラーが存在する場合にメッセージを下段に表示 */}
                {errors.title && (
                  <div className="mt-2 text-xs text-red-600">
                    {String(errors.title.message)}
                  </div>
                )}
              </div>

              <div className="my-4 gap-2 border-y border-gray-400 py-5">
                <label
                  htmlFor="hs-feedback-post-comment-textarea-1"
                  className="mb-3 block text-lg font-bold dark:text-white lg:text-xl"
                >
                  質問内容
                </label>
                <div className="mt-1">
                  <textarea
                    id="hs-feedback-post-comment-textarea-1"
                    rows={3}
                    className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:p-4"
                    placeholder="質問の本文を記載して下さい。"
                    {...register("content", {
                      maxLength: {
                        message: "10000文字以下で記載してください。",
                        value: 10000,
                      },
                      required: {
                        message: "入力が必須の項目です",
                        value: true,
                      },
                    })}
                  ></textarea>
                  {/* エラーが存在する場合にメッセージを下段に表示 */}
                  {errors.content && (
                    <div className="mt-2 text-xs text-red-600">
                      {String(errors.content.message)}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  質問を投稿する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default QuestionForm;

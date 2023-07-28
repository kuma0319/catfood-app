import "moment-timezone";

import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";

import { UserAnswersProps, UserQuestionsProps } from "@/pages/my_page";
import { answerDeleteUrl, questionDeleteUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

const UserQA = ({
  userAnswersProps,
  userQuestionsProps,
}: {
  userAnswersProps: UserAnswersProps;
  userQuestionsProps: UserQuestionsProps;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const cookies = parseCookies();
  const router = useRouter();

  // 質問削除用の関数
  const deleteQuestion = async (questionId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${questionDeleteUrl(
          questionId.toString()
        )}`,
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 200) {
        await router.push(`/my_page`);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage("削除エラー");
      console.log(error.response);
    }
  };

  // 回答削除用の関数
  const deleteAnswer = async (answerId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${answerDeleteUrl(
          answerId.toString()
        )}`,
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 200) {
        await router.push(`/my_page`);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage("削除エラー");
      console.log(error.response);
    }
  };

  return (
    <div>
      {/* エラーの場合にエラーメッセージを表示する */}
      <div className="text-center text-lg text-red-600">{errorMessage}</div>
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
          {/* ユーザーの質問一覧 start */}
          <div className="py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
              {userQuestionsProps.questions.map((question) => (
                <div
                  className="border-b border-gray-400 py-4 md:py-8"
                  key={question.id}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="w-3/5">
                      <span className="block truncate text-sm font-bold">
                        {question.title}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {/* momentモジュールを使用してタイムゾーンを東京指定で更新日時を装飾 */}
                        {moment(question.updated_at)
                          .tz("Asia/Tokyo")
                          .format("Y年M月D日に質問済み")}
                      </span>
                    </div>
                    <div className="flex w-1/6 gap-2">
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        onClick={() => {
                          if (
                            window.confirm(
                              "この質問を削除してもよろしいですか？関連する回答も含めて削除されます。"
                            )
                          ) {
                            deleteQuestion(question.id);
                          }
                        }}
                      >
                        削除
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/forum/[id]"
                    as={`/forum/${question.id}`}
                    className="mt-3 text-gray-700 line-clamp-2 hover:text-blue-500 hover:underline"
                  >
                    {question.content}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* ユーザーの質問一覧 end */}
        </div>
        <div
          id="bar-with-underline-6"
          className="hidden"
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-6"
        >
          {/* ユーザーの回答一覧 start */}
          <div className="py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
              {userAnswersProps.answers.map((answer) => (
                <div
                  className="border-b border-gray-400 py-4 md:py-8"
                  key={answer.id}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="w-3/5">
                      <span className="block text-sm text-gray-500">
                        {/* momentモジュールを使用してタイムゾーンを東京指定で更新日時を装飾 */}
                        {moment(answer.updated_at)
                          .tz("Asia/Tokyo")
                          .format("Y年M月D日に回答済み")}
                      </span>
                    </div>
                    <div className="flex w-1/6 gap-2">
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        onClick={() => {
                          if (
                            window.confirm(
                              "この回答を削除してもよろしいですか？"
                            )
                          ) {
                            deleteAnswer(answer.id);
                          }
                        }}
                      >
                        削除
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/forum/[id]"
                    as={`/forum/${answer.question_id}`}
                    className="mt-3 text-gray-700 line-clamp-2 hover:text-blue-500 hover:underline"
                  >
                    {answer.content}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* ユーザーの回答一覧 end */}
        </div>
      </div>
    </div>
  );
};

export default UserQA;

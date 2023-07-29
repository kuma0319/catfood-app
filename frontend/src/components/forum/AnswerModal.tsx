import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Spinners from "@/components/commons/Spinners";
import { answersUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

interface AnswerInput {
  content: string;
}

const AnswerModal = ({ questionId }: { questionId: number }) => {
  // React Hook Formライブラリを使用
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AnswerInput>({
    criteriaMode: "all",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const cookies = parseCookies();

  const handleAnswer = async () => {
    if (cookies["access-token"]) {
      setIsModalOpen(true);
    } else {
      await router.push({
        pathname: "/auth/sign_in",
      });
      setIsModalOpen(false);
    }
  };

  const onPostAnswer = async (data: AnswerInput) => {
    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${answersUrl}`,
        {
          content: data.content,
          question_id: questionId,
        },
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 201) {
        await router.push(`/forum/${questionId}`);
        setIsModalOpen(false);
        setIsLoading(false);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage("投稿エラー");
      console.log(error.response);
      setIsLoading(false);
    }
  };
  return (
    // モーダルの参考元:https://preline.co/examples/overlays-modals.html
    <>
      <div className="text-center">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
          data-hs-overlay="#hs-notifications"
          onClick={handleAnswer}
        >
          この質問に回答する
        </button>
      </div>

      {/* stateのisModalOpenがtrueになった場合のみモーダルを表示 */}
      {isModalOpen && (
        <div
          id="hs-notifications"
          className="hs-overlay fixed left-0 top-0 z-[60] hidden h-full w-full overflow-y-auto overflow-x-hidden"
        >
          <div className="m-3 mt-0 opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              {isLoading && <Spinners />}
              <div className="absolute right-2 top-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm text-gray-500 transition-all hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                  data-hs-overlay="#hs-notifications"
                >
                  <span className="sr-only">閉じる</span>
                  <svg
                    className="h-3.5 w-3.5"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto p-4 sm:p-10">
                <div className="mx-auto max-w-2xl">
                  {/* エラーの場合にエラーメッセージを表示する */}
                  <div className="text-center text-lg text-red-600">
                    {errorMessage}
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white sm:text-3xl">
                      質問へ回答する
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit(onPostAnswer)}>
                    <div className="my-4 gap-2 py-5">
                      <label
                        htmlFor="hs-feedback-post-comment-textarea-1"
                        className="mb-3 block text-lg font-bold dark:text-white lg:text-xl"
                      >
                        回答内容
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="hs-feedback-post-comment-textarea-1"
                          rows={10}
                          className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:p-4"
                          placeholder="1～10000文字で入力して下さい。"
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
                        回答を投稿する
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerModal;

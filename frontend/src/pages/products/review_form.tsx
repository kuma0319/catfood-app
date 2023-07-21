import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import RootLayout from "@/components/commons/Layout";
import Spinners from "@/components/commons/Spinners";
import StarRating from "@/components/products/StarRating";
import {
  EATING_PARAMS,
  FUR_PARAMS,
  HEALTH_PARAMS,
  SCENT_PARAMS,
} from "@/review_constant";
import { ReviewInput } from "@/types/reviews";
import { productReviewsUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/authApi";

const ReviewForm = () => {
  // React Hook Formライブラリを使用
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ReviewInput>({
    criteriaMode: "all",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onReview = async (data: ReviewInput) => {
    const foodId = router.query.foodId;
    const cookies = parseCookies();

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${productReviewsUrl}`,
        {
          title: data.title,
          content: data.content,
          // 各評価項目におけるスコアを含める
          evaluations_attributes: [
            {
              review_item_id: SCENT_PARAMS.id,
              score: data.rateOfScent,
            },
            {
              review_item_id: EATING_PARAMS.id,
              score: data.rateOfEating,
            },
            {
              review_item_id: HEALTH_PARAMS.id,
              score: data.rateOfHealth,
            },
            {
              review_item_id: FUR_PARAMS.id,
              score: data.rateOfFur,
            },
          ],
          food_id: foodId,
        },
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 201) {
        await router.push(`/products/${foodId}`);
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
      const review_flag = router.query.review_flag;
      // URLパラメータに特定のフラグ(review_flag)が無いとホームへリダイレクト
      if (review_flag !== "true") {
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
              レビューを投稿
            </h2>
          </div>

          <div className="relative z-10 mt-5 rounded-xl border bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:mt-10 md:p-10">
            <form onSubmit={handleSubmit(onReview)}>
              <div className="my-4 gap-2 border-y border-gray-400 py-5">
                <h2 className="mb-3 text-lg font-bold dark:text-white lg:text-xl">
                  項目別評価
                </h2>
                {/* 評価項目：フードの香り */}
                <div className="mb-3">
                  <h3 className="mb-3 block text-base dark:text-white lg:text-xl">
                    {SCENT_PARAMS.name}
                  </h3>
                  {/* React Hook FormのControllerコンポーネントを使用 */}
                  <Controller
                    control={control}
                    name="rateOfScent"
                    rules={{
                      min: { message: "評価が必須です", value: 1 },
                      required: "評価が必須です",
                    }}
                    defaultValue={0}
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        setRating={field.onChange}
                      />
                    )}
                  />
                  {/* エラーが存在する場合にメッセージを下段に表示 */}
                  {errors.rateOfScent && (
                    <div className="mt-2 text-xs text-red-600">
                      {String(errors.rateOfScent.message)}
                    </div>
                  )}
                </div>
                {/* 評価項目：食い付きの良さ */}
                <div className="mb-3">
                  <h3 className="mb-3 block text-base dark:text-white lg:text-xl">
                    {EATING_PARAMS.name}
                  </h3>
                  <Controller
                    control={control}
                    name="rateOfEating"
                    rules={{
                      min: { message: "評価が必須です", value: 1 },
                      required: "評価が必須です",
                    }}
                    defaultValue={0}
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        setRating={field.onChange}
                      />
                    )}
                  />
                  {/* エラーが存在する場合にメッセージを下段に表示 */}
                  {errors.rateOfEating && (
                    <div className="mt-2 text-xs text-red-600">
                      {String(errors.rateOfEating.message)}
                    </div>
                  )}
                </div>
                {/* 評価項目：体調の変化 */}
                <div className="mb-3">
                  <h3 className="mb-3 block text-base dark:text-white lg:text-xl">
                    {HEALTH_PARAMS.name}
                  </h3>
                  <Controller
                    control={control}
                    name="rateOfHealth"
                    rules={{
                      min: { message: "評価が必須です", value: 1 },
                      required: "評価が必須です",
                    }}
                    defaultValue={0}
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        setRating={field.onChange}
                      />
                    )}
                  />
                  {/* エラーが存在する場合にメッセージを下段に表示 */}
                  {errors.rateOfHealth && (
                    <div className="mt-2 text-xs text-red-600">
                      {String(errors.rateOfHealth.message)}
                    </div>
                  )}
                </div>
                {/* 評価項目：毛並みの変化 */}
                <div className="mb-3">
                  <h3 className="mb-3 block text-base dark:text-white lg:text-xl">
                    {FUR_PARAMS.name}
                  </h3>
                  <Controller
                    control={control}
                    name="rateOfFur"
                    rules={{
                      min: { message: "評価が必須です", value: 1 },
                      required: "評価が必須です",
                    }}
                    defaultValue={0}
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        setRating={field.onChange}
                      />
                    )}
                  />
                  {/* エラーが存在する場合にメッセージを下段に表示 */}
                  {errors.rateOfFur && (
                    <div className="mt-2 text-xs text-red-600">
                      {String(errors.rateOfFur.message)}
                    </div>
                  )}
                </div>
              </div>
              <div className="my-4 gap-2 border-gray-400 py-5">
                <label
                  htmlFor="hs-feedback-post-comment-name-1"
                  className="mb-3 block text-lg font-bold dark:text-white lg:text-xl"
                >
                  レビュータイトル
                </label>
                <input
                  type="text"
                  id="hs-feedback-post-comment-name-1"
                  className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:p-4"
                  placeholder="レビューの伝えたいポイントを記載して下さい。"
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
                  レビュー内容
                </label>
                <div className="mt-1">
                  <textarea
                    id="hs-feedback-post-comment-textarea-1"
                    rows={3}
                    className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:p-4"
                    placeholder="レビューの本文を記載して下さい。"
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
                  レビューを投稿する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ReviewForm;

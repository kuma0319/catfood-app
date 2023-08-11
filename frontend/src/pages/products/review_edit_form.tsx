import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";
import { useState } from "react";
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
import { Review, ReviewInput } from "@/types/reviews";
import { reviewDetailUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // contextによって、reviewIdとクッキー情報を取得
  const reviewId = context.query.reviewId as string;
  const cookies = nookies.get(context);

  // 指定のAPIエンドポイントにヘッダーを含めたリクエストを投げる
  try {
    const response = await axios.get(
      // reviewDetailUrlの引数にreviewIdを渡すことで、リクエストURLを動的に変更
      `${process.env.BACKEND_URL}${reviewDetailUrl(reviewId)}`,
      {
        headers: getAuthHeadersWithCookies(cookies),
      }
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

const ReviewEditForm = (props: Review) => {
  // レビュー用の定数を元にidから配列(id - 1)を指定
  const ScentParamsIndex = SCENT_PARAMS.id - 1;
  const EatingParamsIndex = EATING_PARAMS.id - 1;
  const HealthParamsIndex = HEALTH_PARAMS.id - 1;
  const FurParamsIndex = FUR_PARAMS.id - 1;

  // React Hook Formライブラリを使用
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ReviewInput>({
    criteriaMode: "all",
    defaultValues: {
      // defaultValuesオプションを使用して、propsで受け取ったreviewデータを元に初期値を設定
      title: props.title,
      content: props.content,
      rateOfEating: props.evaluations[EatingParamsIndex].score,
      rateOfFur: props.evaluations[FurParamsIndex].score,
      rateOfHealth: props.evaluations[HealthParamsIndex].score,
      rateOfScent: props.evaluations[ScentParamsIndex].score,
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onEditReview = async (data: ReviewInput) => {
    const cookies = parseCookies();

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${reviewDetailUrl(
          props.id.toString()
        )}`,
        {
          title: data.title,
          content: data.content,
          // 各評価項目におけるスコアを含める
          // updateアクションにおいては、評価項目ごとのidを指定してやる必要があるためidを指定
          evaluations_attributes: [
            {
              id: props.evaluations[ScentParamsIndex].id,
              score: data.rateOfScent,
            },
            {
              id: props.evaluations[EatingParamsIndex].id,
              score: data.rateOfEating,
            },
            {
              id: props.evaluations[HealthParamsIndex].id,
              score: data.rateOfHealth,
            },
            {
              id: props.evaluations[FurParamsIndex].id,
              score: data.rateOfFur,
            },
          ],
        },
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 200) {
        await router.push(`/my_page`);
        setIsLoading(false);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage("更新エラー");
      console.log(error.response);
      setIsLoading(false);
    }
  };

  return (
    <RootLayout>
      {isLoading && <Spinners />}
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* エラーの場合にエラーメッセージを表示する */}
        <div className="text-center text-lg text-red-600">{errorMessage}</div>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white sm:text-3xl">
              レビューを編集
            </h2>
          </div>

          <div className="relative z-10 mt-5 rounded-xl border bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:mt-10 md:p-10">
            <form onSubmit={handleSubmit(onEditReview)}>
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
                  編集したレビューを投稿する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ReviewEditForm;

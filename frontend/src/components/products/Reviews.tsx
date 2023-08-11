import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import { ReviewData } from "@/types/reviews";
import { productReviewsUrl } from "@/urls";

import Score from "../commons/Score";

const Reviews = ({ foodId }: { foodId: number }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState<ReviewData>();
  const router = useRouter();
  const cookies = parseCookies();
  // 日付を修正するためのmoment及びmoment-timezoneを読み込み
  const moment = require("moment");
  require("moment-timezone");

  // コンポーネントレンダリング時に商品レビューを取得(商品ページ自体はSSGのためレビュー部分はuseEffectを使用)
  // useEffectで即時関数として定義
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${productReviewsUrl}`,
        {
          params: {
            food_id: foodId,
          },
        }
      );
      if (response.status === 200) {
        setReviewData(response.data);
        setIsLoading(false);
      } else {
        setErrorMessage("何らかのエラーが発生しました");
      }
    })();
  }, []);

  const goToReviewPage = () => {
    if (cookies["access-token"]) {
      router.push({
        pathname: "/products/review_form",
        query: { foodId, review_flag: true },
      });
    } else {
      router.push({
        pathname: "/auth/sign_in",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      {/* エラーの場合にエラーメッセージを表示する */}
      <div className="text-center text-lg text-red-600">{errorMessage}</div>
      <div className="mx-auto px-4 md:px-8">
        <div className="gap-8 lg:flex">
          <div className="mb-5 max-h-80 max-w-sm rounded border p-4 shadow-md lg:w-1/3">
            <h2 className="mb-3 text-base font-bold text-gray-800 lg:text-xl">
              ユーザーレビュー
            </h2>

            <span className="block text-sm text-gray-500">
              {`総合評価：${reviewData?.reviews.length}件のレビュー`}
            </span>

            <div className="my-4 flex flex-col gap-2 border-y border-gray-400 py-5">
              {reviewData?.average_scores.map((average_score) => (
                <div
                  key={average_score.id}
                  className="mb-0.5 flex items-center gap-2"
                >
                  <div className="-ml-1 flex">
                    <span className="w-28 whitespace-nowrap text-left text-sm text-gray-600">
                      {average_score.name}
                    </span>
                    <Score score={Math.round(average_score.value)} size={5} />
                  </div>
                  <span className="text-sm font-semibold">
                    {`${average_score.value.toFixed(1)}/ 5`}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={goToReviewPage}
                className="block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
              >
                レビューを書く
              </button>
            </div>
          </div>

          <div className="divide-y lg:w-2/3">
            {reviewData?.reviews.map((review) => (
              <div
                className="flex flex-col gap-3 border-b border-gray-400 py-4 md:py-8 "
                key={review.id}
              >
                <div className="flex flex-col">
                  <div className="mb-2 flex items-center space-x-4">
                    <Image
                      className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                      src={
                        review.user.avatar_url
                          ? review.user.avatar_url
                          : "/cat_default_avatar_5416936.png"
                      }
                      alt="アバター"
                      width={100}
                      height={100}
                    />
                    <span className="text-sm text-gray-900">
                      {review.user.nickname}
                    </span>
                  </div>
                  <span className="block text-sm font-bold">
                    {review.title}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {moment(review.updated_at)
                      .tz("Asia/Tokyo")
                      .format("Y年M月D日にレビュー済み")}
                  </span>
                </div>

                {review.evaluations.map((evaluation, index) => (
                  <div className="flex items-center gap-10" key={index}>
                    <span className="w-20 whitespace-nowrap text-left text-sm text-gray-600">
                      {evaluation.review_item.name}
                    </span>
                    <Score score={Math.round(evaluation.score)} size={4} />
                  </div>
                ))}

                <p className="mt-3 break-all text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

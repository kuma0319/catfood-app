import moment from "moment";
import { useRouter } from "next/router";

import { Review } from "@/types/reviews";

import Score from "../commons/Score";

const UserReviews = ({ userReviewProps }: { userReviewProps: Review[] }) => {
  const router = useRouter();

  const goToReviewEditPage = (reviewId: number) => {
    router.push({
      pathname: "/products/review_edit_form",
      query: { reviewId: reviewId },
    });
  };

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {userReviewProps.map((review) => (
          <div
            className="border-b border-gray-400 py-4 md:py-8"
            key={review.id}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className="block text-sm font-bold">{review.title}</span>
                <span className="block text-sm text-gray-500">
                  {moment(review.updated_at).format("Y年M月D日にレビュー済み")}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={() => goToReviewEditPage(review.id)}
                >
                  編集
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  削除
                </button>
              </div>
            </div>

            {review.evaluations.map((evaluation, index) => (
              <div className="flex items-center gap-3" key={index}>
                <span className="w-20 whitespace-nowrap text-left text-sm text-gray-600">
                  {evaluation.review_item.name}
                </span>
                <Score score={Math.round(evaluation.score)} size={6} />
              </div>
            ))}

            <p className="mt-3 text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;

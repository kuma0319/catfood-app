import { GetServerSideProps } from "next";

import CommonMeta from "@/components/commons/CommonMeta";
import RootLayout from "@/components/commons/Layout";
import FavoriteFoods from "@/components/my_page/FavoriteFoods";
import Profile from "@/components/my_page/Profile";
import UserQA from "@/components/my_page/UserQA";
import UserReviews from "@/components/my_page/UserReviews";
import withAuthMyPage from "@/lib/auth_MyPage";
import { FoodData } from "@/types/foods";
import { Review } from "@/types/reviews";
import {
  answersUrl,
  favoriteFoodUrl,
  userQuestionsUrl,
  userReviewsUrl,
  userUrl,
} from "@/urls";

export interface UserProps {
  user: {
    id: number;
    avatar_url: string;
    email: string;
    nickname: string;
  };
}

export interface UserQuestionsProps {
  questions: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: number;
  }[];
}

export interface UserAnswersProps {
  answers: {
    id: number;
    content: string;
    created_at: string;
    question_id: number;
    updated_at: string;
    user_id: number;
  }[];
}

export interface MyPageProps {
  foodData: FoodData;
  reviewData: Review[];
  userAnswersData: UserAnswersProps;
  userData: UserProps;
  userQuestionsData: UserQuestionsProps;
}

// withAuthMyPageで引数として渡したエンドポイントへAPIリクエストを送り、propsを受け取る
export const getServerSideProps: GetServerSideProps = withAuthMyPage([
  `${userUrl}`, // ユーザーデータ
  `${favoriteFoodUrl}`, // お気に入りフードデータ
  `${userReviewsUrl}`, // ユーザーが投稿したレビューデータ
  `${userQuestionsUrl}`, // ユーザーが投稿した質問
  `${answersUrl}`, // ユーザーが投稿した回答
]);

const MyPage = (props: MyPageProps) => {
  console.log(props.userQuestionsData);
  console.log(props.userAnswersData);

  const meta_title = "ねこまんま | マイページ";
  const meta_description =
    "ねこまんまのマイページです。プロフィールの編集やお気に入りフードの確認が出来ます。";
  const meta_url = "https://www.nekomanmafood.com/my_page";
  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <RootLayout>
        <nav
          className="relative z-0 flex overflow-hidden rounded-xl border "
          aria-label="Tabs"
          role="tablist"
        >
          <button
            type="button"
            className="active -white relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600       hs-tab-active:text-gray-900"
            id="bar-with-underline-item-1"
            data-hs-tab="#bar-with-underline-1"
            aria-controls="bar-with-underline-1"
            role="tab"
          >
            プロフィール
          </button>
          <button
            type="button"
            className="-white relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600       hs-tab-active:text-gray-900"
            id="bar-with-underline-item-2"
            data-hs-tab="#bar-with-underline-2"
            aria-controls="bar-with-underline-2"
            role="tab"
          >
            お気に入りリスト
          </button>
          <button
            type="button"
            className="-white relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600       hs-tab-active:text-gray-900"
            id="bar-with-underline-item-3"
            data-hs-tab="#bar-with-underline-3"
            aria-controls="bar-with-underline-3"
            role="tab"
          >
            マイレビュー
          </button>
          <button
            type="button"
            className="-white relative min-w-0 flex-1 overflow-hidden border-b-2 border-l bg-white p-4 text-center text-sm font-medium text-gray-500 first:border-l-0 hover:bg-gray-50 hover:text-gray-700 focus:z-10 hs-tab-active:border-b-blue-600       hs-tab-active:text-gray-900"
            id="bar-with-underline-item-4"
            data-hs-tab="#bar-with-underline-4"
            aria-controls="bar-with-underline-4"
            role="tab"
          >
            マイQ&A
          </button>
        </nav>

        <div className="mt-4">
          <div
            id="bar-with-underline-1"
            role="tabpanel"
            aria-labelledby="bar-with-underline-item-1"
          >
            <Profile profileProps={props.userData} />
          </div>
          <div
            id="bar-with-underline-2"
            className="hidden"
            role="tabpanel"
            aria-labelledby="bar-with-underline-item-2"
          >
            <FavoriteFoods favoriteFoodProps={props.foodData} />
          </div>
          <div
            id="bar-with-underline-3"
            className="hidden"
            role="tabpanel"
            aria-labelledby="bar-with-underline-item-3"
          >
            <UserReviews userReviewProps={props.reviewData} />
          </div>
          <div
            id="bar-with-underline-4"
            className="hidden"
            role="tabpanel"
            aria-labelledby="bar-with-underline-item-4"
          >
            <UserQA
              userQuestionsProps={props.userQuestionsData}
              userAnswersProps={props.userAnswersData}
            />
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default MyPage;

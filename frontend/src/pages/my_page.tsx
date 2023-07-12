import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import MyPageTabs from "@/components/my_page/MyPageTabs";
import withAuthMyPage from "@/lib/auth_MyPage";
import { FoodData } from "@/types/foods";
import { favoriteFoodUrl, userUrl } from "@/urls";

export interface UserProps {
  user: {
    id: number;
    avatar_url: string;
    email: string;
    nickname: string;
  };
}

export interface MyPageProps {
  foodData: FoodData;
  userData: UserProps;
}

// withAuthMyPageで引数として渡したエンドポイントへAPIリクエストを送り、propsを受け取る
export const getServerSideProps: GetServerSideProps = withAuthMyPage([
  `${userUrl}`,
  `${favoriteFoodUrl}`,
]);

const MyPage = (props: MyPageProps) => {
  return (
    <RootLayout>
      <MyPageTabs props={props} />
    </RootLayout>
  );
};

export default MyPage;

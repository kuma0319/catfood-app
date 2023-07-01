import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import MyPageTabs from "@/components/my_page/MyPageTabs";
import withAuthServerSideProps from "@/lib/auth";
import { userUrl } from "@/urls";

export interface UserProps {
  user: {
    id: number;
    avatar_url: string;
    email: string;
    nickname: string;
  };
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  `${userUrl}`
);

const MyPage = (props: UserProps) => {
  return (
    <RootLayout>
      <MyPageTabs props={props} />
    </RootLayout>
  );
};

export default MyPage;

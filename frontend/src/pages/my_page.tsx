import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import MyPageTabs from "@/components/my_page/MyPageTabs";
import withAuthServerSideProps from "@/lib/auth";
import { userUrl } from "@/urls";

interface UserProps {
  user: {
    id: number;
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
      <MyPageTabs email={props.user.email} nickname={props.user.nickname} />
    </RootLayout>
  );
};

export default MyPage;

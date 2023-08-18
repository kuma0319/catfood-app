import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";

import CommonMeta from "@/components/commons/CommonMeta";
import RootLayout from "@/components/commons/Layout";
import QuestionIndex from "@/components/forum/QuestionIndex";
import QuestionModal from "@/components/forum/QuestionModal";
import { MinimumUserInfo } from "@/types/user";
import { questionIndexUrl } from "@/urls";

export interface Questions {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: MinimumUserInfo;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}${questionIndexUrl}`
    );
    // エラー無い場合はレスポンスのデータを返す
    const props = await response.data;
    return { props };
  } catch (error: any) {
    throw error;
  }
};

const Forum = (props: { questions: Questions[] }) => {
  console.log(props);

  const meta_title = "ねこまんま | 相談所";
  const meta_description =
    "ねこまんまの相談所です。ユーザー様同士でキャットフードについて質問&回答を投稿し、相互に相談することが出来ます。";
  const meta_url = "https://www.nekomanmafood.com/forum";
  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <RootLayout>
        <div className="mx-auto max-w-screen-md bg-white px-4 py-6 sm:py-8 md:px-8 lg:py-12">
          <div className="relative rounded border border-gray-300 bg-red-100 p-6">
            <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 md:text-2xl lg:text-3xl">
              キャットフード相談所
            </h2>
            <Image
              className=" absolute right-2 top-0 sm:right-10 sm:top-1 md:right-20 md:top-2 lg:right-20 lg:top-3"
              src="/cat-hatena.png"
              alt="はてなマークをたくさん浮かべる猫"
              width={70}
              height={70}
              unoptimized={true} // これが無いと透過するため
            />
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              キャットフードに関する疑問や悩みを質問してみませんか？
              <br />
              ユーザー同士で相互に質問・回答が出来ます。
            </p>
          </div>
          <div className="flex justify-center p-4">
            <QuestionModal />
          </div>
          <QuestionIndex props={props} />
        </div>
      </RootLayout>
    </>
  );
};

export default Forum;

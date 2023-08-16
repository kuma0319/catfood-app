import "moment-timezone";

import axios from "axios";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";

import CommonMeta from "@/components/commons/CommonMeta";
import RootLayout from "@/components/commons/Layout";
import AnswerModal from "@/components/forum/AnswerModal";
import { MinimumUserInfo } from "@/types/user";
import { questionDetailUrl } from "@/urls";

interface Answers {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: MinimumUserInfo;
}

export interface QuestionDetail {
  id: number;
  title: string;
  answers: Answers[];
  content: string;
  created_at: string;
  updated_at: string;
  user: MinimumUserInfo;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context.paramsがundifinedの場合の分岐を追加
  const id = context.params ? (context.params.id as string) : undefined;

  if (id === undefined) {
    return {
      notFound: true,
    };
  } else {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}${questionDetailUrl(id)}`
      );

      // エラー無い場合はレスポンスのデータを返す
      const props = await response.data;
      return { props };
    } catch (error: any) {
      throw error;
    }
  }
};

const QuestionDetail = (props: QuestionDetail) => {
  const meta_title = "ねこまんま | 相談所 質問詳細";
  const meta_description =
    "ねこまんまの相談所の質問詳細ページです。回答の閲覧や質問への回答が出来ます。";
  const meta_url = `https://www.nekomanmafood.com/forum/${props.id}`;

  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <RootLayout>
        <div className="px-4 py-6 sm:py-8 lg:py-12">
          <div className="gap-4 rounded border border-gray-300 p-4 shadow-md">
            <div className="mx-auto max-w-screen-xl p-4 md:p-8">
              <div className="mb-2 flex items-center space-x-4">
                <Image
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-white "
                  src={
                    props.user.avatar_url
                      ? props.user.avatar_url
                      : "/cat_default_avatar_5416936.png"
                  }
                  alt="ユーザーアバター"
                  width={100}
                  height={100}
                />
                <span className="text-sm text-gray-900">
                  {props.user.nickname}
                </span>
              </div>
              {/* hrefにprops.idを渡して動的にルーティング */}
              <span className="block text-sm font-medium text-gray-500 ">
                {props.title}
              </span>
              <span className="block text-sm text-gray-500">
                {moment(props.updated_at)
                  .tz("Asia/Tokyo")
                  .format("Y年M月D日に投稿済み")}
              </span>

              <p className="mt-3 text-gray-600">{props.content}</p>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <AnswerModal questionId={props.id} />
          </div>
          <div className="mt-10 gap-4 rounded p-4 shadow-md">
            <h1 className="mb-4 text-xl font-bold">{`回答 ${props.answers.length}件`}</h1>
            <div className="mx-auto max-w-screen-xl p-4 md:p-8">
              <div className="divide-y">
                {props.answers.map((answer) => (
                  <div
                    className="flex flex-col gap-3 border-b border-gray-400 py-4 md:py-8 "
                    key={answer.id}
                  >
                    <div className="flex flex-col">
                      <div className="mb-2 flex items-center space-x-4">
                        <Image
                          className="inline-block h-11 w-11 rounded-full ring-2 ring-white "
                          src={
                            answer.user.avatar_url
                              ? answer.user.avatar_url
                              : "/cat_default_avatar_5416936.png"
                          }
                          alt="ユーザーアバター"
                          width={100}
                          height={100}
                        />
                        <span className="text-sm text-gray-900">
                          {answer.user.nickname}
                        </span>
                      </div>
                      <span className="block text-sm text-gray-500">
                        {moment(answer.updated_at)
                          .tz("Asia/Tokyo")
                          .format("Y年M月D日に投稿済み")}
                      </span>

                      <p className="mt-3 text-gray-600">{answer.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default QuestionDetail;

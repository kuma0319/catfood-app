import "moment-timezone";

import axios from "axios";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";

import RootLayout from "@/components/commons/Layout";
import { MinimumUserInfo } from "@/types/user";
import { questionDetailUrl } from "@/urls";

interface Answers {
  id: number;
  title: string;
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
  }
};

const QuestionDetail = (props: QuestionDetail) => {
  return (
    <RootLayout>
      <div className="px-4 py-6 sm:py-8 lg:py-12">
        <div className="gap-4 rounded p-4 shadow-md">
          <div className="mx-auto max-w-screen-xl p-4 md:p-8">
            <div className="mb-2 flex items-center space-x-4">
              <Image
                className="inline-block h-11 w-11 rounded-full ring-2 ring-white dark:ring-gray-800"
                src={
                  props.user.avatar_url
                    ? props.user.avatar_url
                    : "/kkrn_icon_user_1.svg"
                }
                alt="アバター"
                width={100}
                height={100}
              />
              <span className="text-sm text-gray-900">
                {props.user.nickname}
              </span>
            </div>
            {/* hrefにprops.idを渡して動的にルーティング */}
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
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
                        className="inline-block h-11 w-11 rounded-full ring-2 ring-white dark:ring-gray-800"
                        src={
                          answer.user.avatar_url
                            ? answer.user.avatar_url
                            : "/kkrn_icon_user_1.svg"
                        }
                        alt="アバター"
                        width={100}
                        height={100}
                      />
                      <span className="text-sm text-gray-900">
                        {answer.user.nickname}
                      </span>
                    </div>
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      {answer.title}
                    </span>
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
  );
};

export default QuestionDetail;

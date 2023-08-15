import "moment-timezone";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import { Questions } from "@/pages/forum";

const QuestionIndex = ({ props }: { props: { questions: Questions[] } }) => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <p className="text-left text-base font-medium text-gray-500">
          質問件数: {props.questions.length}件
        </p>
        <div className="divide-y">
          {props.questions.map((question) => (
            <div
              className="flex flex-col gap-3 border-b border-gray-400 py-4 md:py-8 "
              key={question.id}
            >
              <div className="flex flex-col">
                <div className="mb-2 flex items-center space-x-4">
                  <Image
                    className="inline-block h-11 w-11 rounded-full ring-2 ring-white "
                    src={
                      question.user.avatar_url
                        ? question.user.avatar_url
                        : "/cat_default_avatar_5416936.png"
                    }
                    alt="デフォルトの猫アバター"
                    width={100}
                    height={100}
                  />
                  <span className="text-sm text-gray-900">
                    {question.user.nickname}
                  </span>
                </div>
                {/* hrefにquestion.idを渡して動的にルーティング */}
                <p className="block truncate text-sm font-medium text-gray-500  ">
                  {question.title}
                </p>
                <span className="block text-sm text-gray-500">
                  {moment(question.updated_at)
                    .tz("Asia/Tokyo")
                    .format("Y年M月D日に投稿済み")}
                </span>
              </div>

              <Link
                href="/forum/[id]"
                as={`/forum/${question.id}`}
                className="mt-3 text-gray-700 line-clamp-2 hover:text-blue-500 hover:underline"
              >
                {question.content}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionIndex;

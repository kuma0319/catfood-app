import Image from "next/image";

import CommonMeta from "@/components/commons/CommonMeta";
import RootLayout from "@/components/commons/Layout";

const Inquiry = () => {
  const meta_title = "ねこまんま | お問い合わせ";
  const meta_description = "ねこまんまのお問い合わせ用ページです。";
  const meta_url = "https://www.nekomanmafood.com/inquiry";
  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <RootLayout>
        <div className="mx-auto max-w-screen-md rounded border border-gray-300 bg-pink-100 p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">お問い合わせ</h2>
          <p className="mt-3 text-gray-500">
            「ねこまんま」をご利用下さりありがとうございます。
          </p>
          <p className="mt-3 text-gray-500">
            サイトについてのお問い合わせや、ご意見・ご要望、バグの報告などありましたら、
            以下のメールアドレス、もしくはサイト下部のX（旧:twitter）アカウントのDMにてご連絡頂けますと幸いです。
          </p>
          <p className="my-6 text-sm text-gray-500">
            サポートEメール：support@nekomanmafood.com
          </p>
          <Image
            className="mx-auto mt-6"
            src="/cat-thanks.png"
            alt="ありがとうを伝える猫"
            width={150}
            height={150}
            unoptimized={true} // これが無いと透過するため
          />
        </div>
      </RootLayout>
    </>
  );
};

export default Inquiry;

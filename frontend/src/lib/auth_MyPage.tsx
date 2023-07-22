import axios from "axios";
import { GetServerSideProps } from "next";
import nookies from "nookies";

import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

const withAuthMyPage = (
  // 引数にurlの配列を受け取る
  urls: string[]
): GetServerSideProps => {
  return async (context) => {
    const cookies = nookies.get(context);

    // 指定のAPIエンドポイントにヘッダーを含めたリクエストを投げる
    try {
      // Promise.allで全てのエンドポイントに対するレスポンスを待つ
      const responses = await Promise.all(
        urls.map((url) =>
          axios.get(`${process.env.BACKEND_URL}${url}`, {
            headers: getAuthHeadersWithCookies(cookies),
          })
        )
      );

      // エラー無い場合はレスポンスのデータを返す
      return {
        props: {
          foodData: await responses[1].data,
          reviewData: await responses[2].data,
          userData: await responses[0].data,
        },
      };
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
  };
};

export default withAuthMyPage;

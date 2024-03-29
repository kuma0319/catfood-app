import axios from "axios";
import { GetServerSideProps } from "next";
import nookies from "nookies";

import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const cookies = nookies.get(context);

    // 指定のAPIエンドポイントにヘッダーを含めたリクエストを投げる
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}${url}`, {
        headers: getAuthHeadersWithCookies(cookies),
      });

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
  };
};

export default withAuthServerSideProps;

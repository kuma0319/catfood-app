import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import ForgotPasswordForm from "@/components/authentication/ForgotPasswordForm";
import AuthLayout from "@/components/commons/AuthLayout";
import CommonMeta from "@/components/commons/CommonMeta";
import Spinners from "@/components/commons/Spinners";
import { authPasswordUrl } from "@/urls";
import { getHeaders } from "@/utils/ApiHeaders";

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onForgotPassword = async (data: { email: string }) => {
    const email = data.email;
    const redirect_url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/reset_password`;
    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authPasswordUrl}`,
        { email: email, redirect_url: redirect_url },
        {
          headers: getHeaders(),
        }
      );
      if (response.status === 200) {
        // queryにフラグ（ページへのアクセス権）を含めてルーティング
        await router.push({
          pathname: "/auth/confirm_request",
          query: { confirm_request_flag: true },
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors);
      console.log(error.response);
      setIsLoading(false);
    }
  };

  const meta_title = "ねこまんま | パスワードリセット";
  const meta_description = "ねこまんまのパスワードリセットページです。";

  return (
    <>
      <CommonMeta title={meta_title} description={meta_description} />
      <div className="h-screen bg-gray-100 ">
        <AuthLayout>
          {isLoading && <Spinners />}
          <ForgotPasswordForm
            onForgotPassword={onForgotPassword}
            errorMessage={errorMessage}
          />
        </AuthLayout>
      </div>
    </>
  );
};

export default ForgotPassword;

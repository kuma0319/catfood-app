import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import ForgotPasswordForm from "@/components/authentication/ForgotPasswordForm";
import { authPasswordUrl } from "@/urls";

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onForgotPassword = async (data: { email: string }) => {
    const email = data.email;
    const redirect_url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/reset_password`;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authPasswordUrl}`,
        { email: email, redirect_url: redirect_url },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // メール認証を促すページへpush
        router.push("/auth/confirm_request");
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors);
      console.log(error.response);
    }
  };

  return (
    <ForgotPasswordForm
      onForgotPassword={onForgotPassword}
      errorMessage={errorMessage}
    />
  );
};

export default ForgotPassword;

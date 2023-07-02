import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ResetPasswordForm from "@/components/authentication/ResetPasswordForm";
import { authPasswordUrl } from "@/urls";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    ["access-token"]: access_token,
    client,
    reset_password,
    token,
    uid,
  } = router.query;

  useEffect(() => {
    // routerを待ってからで無いと問答無用でリダイレクトされてしまうため必要
    if (router.isReady) {
      // URLパラメータにリセットパスワード(真偽値)とトークン(reset_password_token)とがなければホームにリダイレクト
      if (reset_password !== "true" || !token) {
        router.push("/");
      }
    }
  }, [router, token, reset_password]);

  const onResetPassword = async (data: {
    password: string;
    passwordConfirmation: string;
  }) => {
    const password = data.password;
    const passwordConfirmation = data.passwordConfirmation;

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authPasswordUrl}`,
        // 新しいパスワードと再設定用トークンを含めリクエスト
        {
          password: password,
          password_confirmation: passwordConfirmation,
          reset_password_token: token,
        },
        {
          headers: {
            Accept: "application/json",
            "access-token": access_token,
            client: client,
            "Content-Type": "application/json",
            uid: uid,
          },
        }
      );
      if (response.status === 200) {
        router.push({
          pathname: "/",
          query: { flashMessage: "パスワードをリセットしました" },
        });
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors);
      console.log(error.response);
    }
  };

  // リセットパスワードとトークンがあればフォームを表示
  return token && reset_password === "true" ? (
    <ResetPasswordForm
      onResetPassword={onResetPassword}
      errorMessage={errorMessage}
    />
  ) : null;
};

export default ResetPassword;

import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";

import SignInForm from "@/components/authentication/SignInForm";
import { authSignInUrl } from "@/urls";

interface SignInInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSignIn = async (data: SignInInput) => {
    const email = data.email;
    const password = data.password;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authSignInUrl}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        // 認証成功時にクッキーへトークンを保存しホームページへリダイレクト
        setCookie(null, "uid", response.headers["uid"]);
        setCookie(null, "client", response.headers["client"]);
        setCookie(null, "access-token", response.headers["access-token"]);
        router.push({
          pathname: "/",
          query: { flashMessage: "ログインしました" },
        });
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors);
    }
  };

  return <SignInForm onSignIn={onSignIn} errorMessage={errorMessage} />;
};

export default SignIn;

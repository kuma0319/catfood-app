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
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const onSignIn = async (data: SignInInput) => {
    const email = data.email;
    const password = data.password;
    // Remember me機能としてクッキーの有効期限を1週間に設定
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authSignInUrl}`,
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Remember me機能が有効な場合
        // 認証成功時にクッキーへトークンを保存しホームページへリダイレクト、期限設定
        if (rememberMe) {
          setCookie(null, "uid", response.headers["uid"], {
            expires: expiryDate,
          });
          setCookie(null, "client", response.headers["client"], {
            expires: expiryDate,
          });
          setCookie(null, "access-token", response.headers["access-token"], {
            expires: expiryDate,
          });
          setRememberMe(false);
          router.push({
            pathname: "/",
            query: { flashMessage: "ログインしました" },
          });
        } else {
          // Remember me機能が無効な場合
          // 認証成功時にクッキーへトークンを保存しホームページへリダイレクト
          setCookie(null, "uid", response.headers["uid"]);
          setCookie(null, "client", response.headers["client"]);
          setCookie(null, "access-token", response.headers["access-token"]);
          router.push({
            pathname: "/",
            query: { flashMessage: "ログインしました" },
          });
        }
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors);
    }
  };

  return (
    <SignInForm
      onSignIn={onSignIn}
      errorMessage={errorMessage}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
    />
  );
};

export default SignIn;

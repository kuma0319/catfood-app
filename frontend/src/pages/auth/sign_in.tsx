import axios from "axios";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useState } from "react";

import SignInForm from "@/components/authentication/SignInForm";
import AuthLayout from "@/components/commons/AuthLayout";
import Spinners from "@/components/commons/Spinners";
import { authSignInUrl } from "@/urls";
import { getHeaders } from "@/utils/ApiHeaders";

export interface SignInInput {
  email: string;
  password: string;
}

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSignIn = async (data: SignInInput) => {
    const email = data.email;
    const password = data.password;

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authSignInUrl}`,
        { email, password },
        {
          headers: getHeaders(),
        }
      );
      if (response.status === 200) {
        // 既存のクッキーが存在する場合は削除
        destroyCookie(null, "uid");
        destroyCookie(null, "client");
        destroyCookie(null, "access-token");

        // Remember me機能が有効な場合
        // 認証成功時にクッキーへトークンを保存しホームページへリダイレクト、期限設定
        if (rememberMe) {
          // Remember me機能としてクッキーの有効期限を1週間に設定
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 7);
          // Promisesを利用して、非同期でクッキーセットを待ってからリダイレクト
          // ∵こうしておかないと、クッキーがセットされないままリダイレクトされることがある。
          Promise.all([
            setCookie(null, "uid", response.headers["uid"], {
              expires: expiryDate,
            }),
            setCookie(null, "client", response.headers["client"], {
              expires: expiryDate,
            }),
            setCookie(null, "access-token", response.headers["access-token"], {
              expires: expiryDate,
            }),
          ]).then(() => {
            router.push({
              pathname: "/",
              query: { flashMessage: "ログインしました" },
            });
          });
          setRememberMe(false);
        } else {
          // Remember me機能が無効な場合
          // 認証成功時にクッキーへトークンを保存しホームページへリダイレクト
          Promise.all([
            setCookie(null, "uid", response.headers["uid"]),
            setCookie(null, "client", response.headers["client"]),
            setCookie(null, "access-token", response.headers["access-token"]),
          ]).then(() => {
            router.push({
              pathname: "/",
              query: { flashMessage: "ログインしました" },
            });
          });
        }
        setIsLoading(false);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors);
      console.log(error.response);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {isLoading && <Spinners />}
      <SignInForm
        onSignIn={onSignIn}
        errorMessage={errorMessage}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      />
    </AuthLayout>
  );
};

export default SignIn;

import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";

import SignUpForm from "@/components/authentication/SignUpForm";
import { authUrl } from "@/urls";

interface SignUpInput {
  email: string;
  password: string;
}

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSignUp = async (data: SignUpInput) => {
    const email = data.email;
    const password = data.password;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setCookie(null, "uid", response.headers["uid"]);
        setCookie(null, "client", response.headers["client"]);
        setCookie(null, "access-token", response.headers["access-token"]);
        // 認証成功時にホームページへリダイレクト
        router.push("/");
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors.full_messages[0]);
    }
  };

  return (
    <>
      <SignUpForm onSignUp={onSignUp} errorMessage={errorMessage} />
    </>
  );
};

export default SignUp;

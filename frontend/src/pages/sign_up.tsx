import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SignUpForm from "@/components/authentication/SignUpForm";
import { authUrl } from "@/urls";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSignUp = async (data: any) => {
    const email = data.email;
    const password = data.password;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        // 認証成功時にホームページへリダイレクト
        router.push("/");
      }
    } catch (error) {
      // エラー発生時はエラーメッセージを画面に表示
      setErrorMessage(error.response.data.errors.full_messages[0]);
    }
  };

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <p>{errorMessage}</p>
      <SignUpForm onSignUp={onSignUp} />
    </>
  );
};

export default SignUp;

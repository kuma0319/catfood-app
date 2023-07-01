import axios from "axios";
import { useRouter } from "next/router";
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
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        router.push({
          pathname: "/",
          query: { flashMessage: "ユーザー登録しました" },
        });
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

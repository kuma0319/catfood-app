import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import SignUpForm from "@/components/authentication/SignUpForm";
import AuthLayout from "@/components/commons/AuthLayout";
import CommonMeta from "@/components/commons/CommonMeta";
import Spinners from "@/components/commons/Spinners";
import { authUrl } from "@/urls";
import { getHeaders } from "@/utils/ApiHeaders";

interface SignUpInput {
  email: string;
  nickname: string;
  password: string;
}

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSignUp = async (data: SignUpInput) => {
    const nickname = data.nickname;
    const email = data.email;
    const password = data.password;

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        {
          email: email,
          nickname: nickname,
          password: password,
        },
        {
          headers: getHeaders(),
        }
      );
      if (response.status === 200) {
        // メール認証を促すページへpush
        await router.push({
          pathname: "/auth/confirm_request",
          query: { confirm_request_flag: true },
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors.full_messages[0]);
      setIsLoading(false);
    }
  };

  const meta_title = "ねこまんま | 新規登録";
  const meta_description =
    "ねこまんまの新規登録ページです。まだ会員登録が未登録の方はこちらから新規登録出来ます。";
  const meta_url = "https://www.nekomanmafood.com/auth/sign_up";
  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <AuthLayout>
        {isLoading && <Spinners />}
        <SignUpForm onSignUp={onSignUp} errorMessage={errorMessage} />;
      </AuthLayout>
    </>
  );
};

export default SignUp;

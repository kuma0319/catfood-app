import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import SignUpForm from "@/components/authentication/SignUpForm";
import AuthLayout from "@/components/commons/AuthLayout";
import Spinners from "@/components/commons/Spinners";
import { authUrl } from "@/urls";

interface SignUpInput {
  email: string;
  password: string;
}

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSignUp = async (data: SignUpInput) => {
    const email = data.email;
    const password = data.password;
    // 認証後のパス（/auth/confirm_success）に対してパラメータを付けておいて外部アクセスを防止する
    const confirm_success_url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/confirm_success?confirm_success_flag=true`;
    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        {
          confirm_success_url: confirm_success_url,
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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

  return (
    <div className="h-screen bg-gray-100 dark:bg-slate-900">
      <AuthLayout>
        {isLoading && <Spinners />}
        <SignUpForm onSignUp={onSignUp} errorMessage={errorMessage} />;
      </AuthLayout>
    </div>
  );
};

export default SignUp;

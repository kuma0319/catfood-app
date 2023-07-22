import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import SignUpForm from "@/components/authentication/SignUpForm";
import AuthLayout from "@/components/commons/AuthLayout";
import Spinners from "@/components/commons/Spinners";
import { authUrl } from "@/urls";
import { getHeaders } from "@/utils/ApiHeaders";

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

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        {
          email: email,
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

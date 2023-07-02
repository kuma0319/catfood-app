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
    const confirm_success_url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirm_success`;
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
        router.push("/confirm_request");
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.errors.full_messages[0]);
    }
  };

  return <SignUpForm onSignUp={onSignUp} errorMessage={errorMessage} />;
};

export default SignUp;

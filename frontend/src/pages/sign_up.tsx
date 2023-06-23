import axios from "axios";

import SignUpForm from "@/components/authentication/SignUpForm";
import { authUrl } from "@/urls";

const SignUp = () => {
  // 入力されたメールアドレスとパスワード情報を元に/authへPOSTリクエスト
  const handleLogin = async (event: any) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(response);
  };

  return <SignUpForm handleLogin={handleLogin} />;
};

export default SignUp;

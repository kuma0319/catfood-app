import axios from "axios";
import router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { useState } from "react";

import { UserProps } from "@/pages/my_page";
import { authUrl } from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

import Spinners from "../commons/Spinners";
import ProfileContents from "./ProfileContents";

const Profile = ({ profileProps }: { profileProps: UserProps }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const onProfileEdit = async (data: { nickname: string }) => {
    const nickname = data.nickname;
    const cookies = parseCookies();

    const formData = new FormData();
    if (nickname) formData.append("nickname", nickname);
    if (avatar) formData.append("avatar", avatar);

    // submit時にローディングをセット
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        formData,
        // ここではutils/getAuthHeadersWithCookiesを使用しない(content_typeがapplication/jsonとなるため)
        {
          headers: {
            Accept: "application/json",
            "access-token": cookies["access-token"],
            client: cookies["client"],
            uid: cookies["uid"],
          },
        }
      );
      // 更新成功時はページリロード
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error: any) {
      // エラー発生時はエラーメッセージをセット
      setErrorMessage(error.response.data.error);
      console.log(error.response);
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const cookies = parseCookies();

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authUrl}`,
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      if (response.status === 200) {
        // アカウント削除成功時に該当するクッキーを削除しリダイレクト
        destroyCookie(null, "uid", cookies["uid"]);
        destroyCookie(null, "client", cookies["client"]);
        destroyCookie(null, "access-token", cookies["access-token"]);
        router.push({
          pathname: "/",
          query: { flashMessage: "アカウントを削除しました" },
        });
      }
    } catch (error: any) {
      setFlashMessage(error.response);
    }
  };

  return (
    <div>
      {isLoading && <Spinners />}
      <ProfileContents
        errorMessage={errorMessage}
        handleDeleteAccount={handleDeleteAccount}
        onProfileEdit={onProfileEdit}
        profileProps={profileProps}
        setAvatar={setAvatar}
      />
    </div>
  );
};

export default Profile;

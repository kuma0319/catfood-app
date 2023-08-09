import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import { kiwi_maru } from "@/utils/font";

import HeaderOnSignIn from "./HeaderOnSignIn";
import HeaderOnSignOut from "./HeaderOnSignOut";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const cookies = parseCookies();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={kiwi_maru.className}>
      {!mounted ? (
        // コンポーネントが未マウント状態の時はヘッダーの表示なし(∵ハイドレーションエラー回避のため)
        <></>
      ) : cookies["uid"] && cookies["client"] && cookies["access-token"] ? (
        // コンポーネントがマウントされ、更に特定のcookieが存在するなら「ログイン状態」扱い
        <HeaderOnSignIn />
      ) : (
        // コンポーネントがマウントされたが特定のcookieが存在しないなら「ログアウト状態」扱い
        <HeaderOnSignOut />
      )}
    </div>
  );
};

export default Header;

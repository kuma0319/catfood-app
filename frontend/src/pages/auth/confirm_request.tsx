import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ConfirmSuccess = () => {
  const router = useRouter();
  const { confirm_request_flag } = router.query;

  useEffect(() => {
    // routerを待ってからで無いと問答無用でリダイレクトされてしまうため必要
    if (router.isReady) {
      // URLパラメータにconfirm_request_flagがない場合はホームにリダイレクト
      if (!confirm_request_flag) {
        router.push("/");
      }
    }
  }, [router, confirm_request_flag]);

  // confirm_request_flagがあればコンポーネントを表示
  return confirm_request_flag === "true" ? (
    <div className="m-10 mx-auto max-w-screen-md p-4 text-center">
      <Image
        src="/cat-greet2.png"
        alt="微笑んでおじぎをする猫"
        width={150}
        height={150}
        className="mx-auto my-10"
        loading="eager" // 遅延読み込みをしない
      />
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          認証用のメールを送信しました。ご確認下さい。
        </h2>
      </div>
      <Link
        href="/"
        className="font-medium text-blue-600 decoration-2 hover:underline"
      >
        ホームへ移動する場合はこちら
      </Link>
      <p className="mt-6 text-sm font-bold text-red-500">
        ※メールが届かない場合は、「迷惑メール」に振り分けられていないかご確認下さい。
      </p>
    </div>
  ) : null;
};

export default ConfirmSuccess;

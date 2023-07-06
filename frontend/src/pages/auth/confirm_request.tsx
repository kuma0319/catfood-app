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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-5">
          <h2 className="text-2xl font-bold dark:text-white md:text-3xl md:leading-tight">
            認証用のメールを送信しました。ご確認下さい。
          </h2>
        </div>
        <Link
          href="/"
          className="font-medium text-blue-600 decoration-2 hover:underline"
        >
          ホームへ移動する場合はこちら
        </Link>
      </div>
    </div>
  ) : null;
};

export default ConfirmSuccess;

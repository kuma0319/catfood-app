import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ConfirmSuccess = () => {
  const router = useRouter();
  const { confirm_success_flag } = router.query;

  useEffect(() => {
    // routerを待ってからで無いと問答無用でリダイレクトされてしまうため必要
    if (router.isReady) {
      // URLパラメータにconfirm_request_flagがない場合はホームにリダイレクト
      if (!confirm_success_flag) {
        router.push("/");
      }
    }
  }, [router, confirm_success_flag]);

  useEffect(() => {
    // URLパラメータにconfirm_request_flagがある場合は認証成功とし、ユーザーにアナウンスを表示しリダイレクト
    const timer = setTimeout(() => {
      // ユーザーが戻るボタンで再表示することを回避するためにreplace
      router.replace({
        pathname: "/",
        query: { flashMessage: "ユーザー登録しました" },
      });
    }, 3000); // 3秒後にリダイレクト
    return () => clearTimeout(timer); // コンポーネントがアンマウントされたときにタイマーをクリア
  }, [router]);

  // confirm_success_flagがあればコンポーネントを表示
  return confirm_success_flag === "true" ? (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-5">
          <h2 className="text-2xl font-bold dark:text-white md:text-3xl md:leading-tight">
            {`登録完了しました。数秒後にホームへ移動します。`}
          </h2>
        </div>
        <Link
          href="/"
          className="font-medium text-blue-600 decoration-2 hover:underline"
        >
          自動でリダイレクトしない場合はこちら
        </Link>
      </div>
    </div>
  ) : null;
};

export default ConfirmSuccess;

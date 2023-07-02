import Link from "next/link";

const ConfirmSuccess = () => {
  return (
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
  );
};

export default ConfirmSuccess;

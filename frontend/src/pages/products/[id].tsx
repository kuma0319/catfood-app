import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import router from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import CommonMeta from "@/components/commons/CommonMeta";
import RootLayout from "@/components/commons/Layout";
import FoodDetail from "@/components/products/FoodDetail";
import Reviews from "@/components/products/Reviews";
import {
  authValidateTokenUrl,
  favoriteFoodIdsUrl,
  favoriteFoodUrl,
  foodDetailUrl,
  foodsIndexIdsUrl,
} from "@/urls";
import { getAuthHeadersWithCookies } from "@/utils/ApiHeaders";

import { Food } from "../../types/foods";

export const getStaticPaths: GetStaticPaths = async () => {
  // Rails側の全商品のidの配列を返すエンドポイントへリクエスト
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodsIndexIdsUrl}`
  );
  const data = response.data;

  // レスポンスからidに応じたパスを生成
  const paths = data.map((item: { id: number }) => {
    return { params: { id: `${item.id}` } };
  });

  //paths（事前ビルド用のパス）、fallback(指定パス以外のアクセス時の挙動)を指定
  return { fallback: false, paths: paths };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // パラメータで渡ってきたparams.idをページネーションに使用
  const id = Number(context.params?.id);

  if (id === undefined) {
    return {
      notFound: true,
    };
  } else {
    //params.idからデータフェッチ
    const response = await axios.get(
      `${process.env.BACKEND_URL}${foodDetailUrl(id)}`
    );
    return {
      props: {
        food: response.data,
      },
    };
  }
};

const FoodShow = ({ food }: { food: Food }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const cookies = parseCookies();

  // フードをお気に入りに登録する処理
  const addFavoriteFood = async () => {
    try {
      const authResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authValidateTokenUrl}`,
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      // 認証成功(=ログイン済み)であった場合はそのまま、axios.postでお気に入り登録をリクエスト。
      if (authResponse.status === 200) {
        const registrationFavoriteResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodUrl}`,
          { food_id: food.id },
          {
            headers: getAuthHeadersWithCookies(cookies),
          }
        );
        // お気に入りに追加出来たらお気に入りボタンのstateを更新
        if (registrationFavoriteResponse.status === 201) {
          setIsFavorited(true);
        } else {
          setErrorMessage("お気に入りの登録に失敗しました");
        }
      }
    } catch (error: any) {
      // 認証失敗(=非ログイン)であった場合はサインインページへリダイレクト
      if (error.response.status === 401) {
        await router.push({
          pathname: "/auth/sign_in",
          query: { flashMessage: "この機能の使用にはログインが必要です。" },
        });
      } else {
        setErrorMessage(error.response);
      }
    }
  };

  // フードをお気に入りから削除する処理
  const removeFavoriteFood = async () => {
    const foodId = food.id;
    // 非ログインユーザーが触れないように削除処理でも認証ステップを入れる
    try {
      const authResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authValidateTokenUrl}`,
        {
          headers: getAuthHeadersWithCookies(cookies),
        }
      );
      // 認証成功(=ログイン済み)であった場合は、axios.deleteでお気に入り登録をリクエスト。
      if (authResponse.status === 200) {
        const registrationFavoriteResponse = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodUrl}`,
          {
            headers: getAuthHeadersWithCookies(cookies),
            params: {
              food_id: foodId,
            },
          }
        );
        // お気に入りから削除出来たらstateを更新
        if (registrationFavoriteResponse.status === 200) {
          setIsFavorited(false);
        } else {
          setErrorMessage("お気に入りの削除に失敗しました");
        }
      }
    } catch (error: any) {
      // 認証失敗(=非ログイン)であった場合はサインインページへリダイレクト
      if (error.response.status === 401) {
        await router.push({
          pathname: "/auth/sign_in",
          query: { flashMessage: "この機能の使用にはログインが必要です。" },
        });
      } else {
        setErrorMessage(error.response);
      }
    }
  };

  // コンポーネントレンダリング時にログイン済みユーザーのお気に入りのfoodIdを読み込み、お気に入り済みかどうかを判断
  // useEffectで即時関数として定義
  useEffect(() => {
    (async () => {
      // コンポーネントマウント時にaccess-tokenクッキーがある場合、ログイン状態としてお気に入りフードのid情報をAPIから取得
      if (cookies["access-token"]) {
        const showFavoriteResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodIdsUrl}`,
          {
            headers: getAuthHeadersWithCookies(cookies),
          }
        );
        // id情報を取得出来たら、mapで現在表示中のフードに一致するものが無いか調べる
        if (showFavoriteResponse.status === 200) {
          showFavoriteResponse.data.food_ids.map((foodId: number) => {
            // 一致するものが合った場合、trueをstateにセット
            if (foodId === food.id) {
              setIsFavorited(true);
            }
          });
        } else {
          setErrorMessage("何らかのエラーが発生しました");
        }
      }
    })();
  }, []);

  const meta_title = `ねこまんま | ${food.name}`;
  const meta_description = `${food.name} の詳細ページです。レビューやお気に入り登録が可能です。`;
  const meta_url = `https://www.nekomanmafood.com/products/${food.id}`;

  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <RootLayout>
        <div className="px-4 py-6 ">
          {/* エラーの場合にエラーメッセージを表示する */}
          <div className="text-center text-lg text-red-600">{errorMessage}</div>
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl font-bold">フード詳細</h1>
            {isFavorited ? (
              <div className="mr-5 flex items-center">
                <button
                  className="active:scale-90"
                  onClick={removeFavoriteFood}
                  title="お気に入りリストから削除します。"
                >
                  <svg
                    className="h-auto w-6 fill-current text-red-500 hover:text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                  </svg>
                </button>
                <span className="ml-2 text-sm">お気に入りから削除</span>
              </div>
            ) : (
              <div className="mr-5 flex items-center">
                <button className="active:scale-90" onClick={addFavoriteFood}>
                  <svg
                    className="h-auto w-6 fill-current text-red-500 hover:text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                  </svg>
                </button>
                <span className="ml-2 text-sm">お気に入りに追加</span>
              </div>
            )}
          </div>
          <FoodDetail key={food.id} food={food} />
          <Reviews foodId={food.id} />
        </div>
      </RootLayout>
    </>
  );
};

export default FoodShow;

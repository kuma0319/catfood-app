import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import router from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import RootLayout from "@/components/commons/Layout";
import FoodDetail from "@/components/FoodDetail";
import {
  authValidateTokenUrl,
  favoriteFoodIdsUrl,
  favoriteFoodUrl,
  foodDetailUrl,
  foodsIndexUrl,
} from "@/urls";

import { Food } from "../../types/foods";

export const getStaticPaths: GetStaticPaths = async () => {
  //商品一覧のデータを取得
  // 環境に応じてリクエスト先を変えられるように、環境変数からリクエストパスを読み込み
  const res = await axios.get(`${process.env.BACKEND_URL}${foodsIndexUrl}`);
  const data = res.data;

  //一覧データからidを配列として取り出す
  const paths = data.map((food: Food) => {
    return { params: { id: `${food.id}` } };
  });

  //paths（事前ビルド用のパス）、fallback(指定パス以外のアクセス時の挙動)を指定
  return { fallback: "blocking", paths: paths };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //params: ParsedUrlQuery | undefinedの分岐
  const id = params ? Number(params.id) : undefined;

  if (id === undefined) {
    return {
      notFound: true,
    };
  } else {
    //params.idからデータフェッチ
    // 環境に応じてリクエスト先を変えられるように、環境変数からリクエストパスを読み込み
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

  // フードをお気に入りに登録
  const addFavoriteFood = async () => {
    try {
      const authResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authValidateTokenUrl}`,
        {
          headers: {
            Accept: "application/json",
            "access-token": cookies["access-token"],
            client: cookies["client"],
            "Content-Type": "application/json",
            uid: cookies["uid"],
          },
        }
      );
      if (authResponse.status === 200) {
        const registrationFavoriteResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodUrl}`,
          { food_id: food.id },
          {
            headers: {
              Accept: "application/json",
              "access-token": cookies["access-token"],
              client: cookies["client"],
              "Content-Type": "application/json",
              uid: cookies["uid"],
            },
          }
        );
        if (registrationFavoriteResponse.status === 201) {
          // お気に入りに追加出来たらstateを更新
          setIsFavorited(true);
        } else {
          console.log("お気に入り追加失敗");
          console.log(registrationFavoriteResponse);
        }
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        await router.push({
          pathname: "/auth/sign_in",
          query: { flashMessage: "この機能の使用にはログインが必要です。" },
        });
      } else {
        console.log(error.response);
      }
    }
  };

  // フードをお気に入りから削除
  const removeFavoriteFood = async () => {
    const foodId = food.id;
    try {
      const authResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authValidateTokenUrl}`,
        {
          headers: {
            Accept: "application/json",
            "access-token": cookies["access-token"],
            client: cookies["client"],
            "Content-Type": "application/json",
            uid: cookies["uid"],
          },
        }
      );
      if (authResponse.status === 200) {
        const registrationFavoriteResponse = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodUrl}?food_id=${foodId}`,
          {
            headers: {
              Accept: "application/json",
              "access-token": cookies["access-token"],
              client: cookies["client"],
              "Content-Type": "application/json",
              uid: cookies["uid"],
            },
          }
        );
        if (registrationFavoriteResponse.status === 200) {
          // お気に入りから削除出来たらstateを更新
          setIsFavorited(false);
        } else {
          console.log("お気に入り削除失敗");
          console.log(registrationFavoriteResponse);
        }
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        await router.push({
          pathname: "/auth/sign_in",
          query: { flashMessage: "この機能の使用にはログインが必要です。" },
        });
      } else {
        console.log(error.response);
      }
    }
  };

  // コンポーネントレンダリング時にログイン済みユーザーのお気に入りのfoodIdを読み込み、お気に入り済みかどうかを判断
  // useEffectで即時関数として定義
  useEffect(() => {
    (async () => {
      if (cookies["access-token"]) {
        const showFavoriteResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodIdsUrl}`,
          {
            headers: {
              Accept: "application/json",
              "access-token": cookies["access-token"],
              client: cookies["client"],
              "Content-Type": "application/json",
              uid: cookies["uid"],
            },
          }
        );
        if (showFavoriteResponse.status === 200) {
          showFavoriteResponse.data.food_ids.map((foodId: number) => {
            if (foodId === food.id) {
              setIsFavorited(true);
            }
          });
        } else {
          console.log("失敗");
          console.log(showFavoriteResponse);
        }
      }
    })();
  }, []);

  return (
    <RootLayout>
      <div className="px-4 py-6 ">
        <div className="flex justify-between">
          <h1 className="mb-4 text-2xl font-bold">商品詳細</h1>
          {isFavorited ? (
            <div className="flex items-center">
              <button className="active:scale-90" onClick={removeFavoriteFood} title="お気に入りリストから削除します。">
                <svg
                  className="h-auto w-6 fill-current text-red-500 hover:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                </svg>
              </button>
              <span className="ml-2">お気に入りから削除</span>
            </div>
          ) : (
            <div className="flex items-center">
              <button className="active:scale-90" onClick={addFavoriteFood}>
                <svg
                  className="h-auto w-6 fill-current text-red-500 hover:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                </svg>
              </button>
              <span className="ml-2">お気に入りに追加</span>
            </div>
          )}
        </div>
        <div className="mb-4 rounded border p-4 shadow-md">
          <FoodDetail key={food.id} food={food} />
        </div>
      </div>
    </RootLayout>
  );
};

export default FoodShow;

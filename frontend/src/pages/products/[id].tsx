import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import router from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";

import RootLayout from "@/components/commons/Layout";
import FoodDetail from "@/components/FoodDetail";
import {
  authValidateTokenUrl,
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
  const cookies = parseCookies();

  const handleFavoriteFoodRegistration = async () => {
    try {
      const authResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${authValidateTokenUrl}`,
        {
          headers: {
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
              "access-token": cookies["access-token"],
              client: cookies["client"],
              "Content-Type": "application/json",
              uid: cookies["uid"],
            },
          }
        );
        if (registrationFavoriteResponse.status === 201) {
          console.log("お気に入り追加成功");
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

  // useEffect( () => {
  //   const showFavoriteResponse = axios.get(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}${favoriteFoodUrl}`,
  //     {
  //       headers: {
  //         "access-token": cookies["access-token"],
  //         client: cookies["client"],
  //         "Content-Type": "application/json",
  //         uid: cookies["uid"],
  //       },
  //     }
  //   ); if (showFavoriteResponse) {

  //   }
  // },[])

  return (
    <RootLayout>
      <div className="px-4 py-6 ">
        <h1 className="mb-4 text-2xl font-bold">商品詳細</h1>
        <button onClick={handleFavoriteFoodRegistration}>
          お気に入りに追加
        </button>
        <div className="mb-4 rounded border p-4 shadow-md">
          <FoodDetail key={food.id} food={food} />
        </div>
      </div>
    </RootLayout>
  );
};

export default FoodShow;

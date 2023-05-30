import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodDetail from "@/components/FoodDetail";
import { foodDetailUrl, foodsIndexUrl, SSR_BASE_URL } from "@/urls";

import { Food } from "../../../types/foods";

export const getStaticPaths: GetStaticPaths = async () => {
  //商品一覧のデータを取得
  const res = await axios.get(`${SSR_BASE_URL}${foodsIndexUrl}`);
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
    const response = await axios.get(`${SSR_BASE_URL}${foodDetailUrl(id)}`);
    return {
      props: {
        food: response.data,
      },
    };
  }
};

interface FoodProps {
  food: Food;
}

const foodDetail = ({ food }: FoodProps) => {
  return (
    <RootLayout>
      <div className="px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">商品詳細</h1>
        <div className="mb-4 rounded border p-4 shadow-md">
          <FoodDetail key={food.id} food={food} />
        </div>
      </div>
    </RootLayout>
  );
};

export default foodDetail;

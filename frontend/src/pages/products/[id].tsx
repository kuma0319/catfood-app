import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";

import RootLayout from "@/components/Layout";
import { foodDetail, foodsIndex, SSR_BASE_URL } from "@/urls";

import { Food } from "../../../types/foods";

export const getStaticPaths: GetStaticPaths = async () => {
  //商品一覧のデータを取得
  const res = await axios.get(`${SSR_BASE_URL}${foodsIndex}`);
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
    const response = await axios.get(`${SSR_BASE_URL}${foodDetail(id)}`);
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

const FoodDetail = ({ food }: FoodProps) => {
  return (
    <RootLayout>
      <div className="px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">商品一覧</h1>
        <div className="mb-4 rounded border p-4 shadow-md">
          <h1>{food.name}</h1>
          {/* <FoodItem key={data.id} food={data} /> */}
        </div>
      </div>
    </RootLayout>
  );
};

export default FoodDetail;

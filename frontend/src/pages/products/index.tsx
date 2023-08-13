//indexページをSSGで表示する場合の設計
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodIndex from "@/components/products/FoodIndex";
import { foodsIndexUrl } from "@/urls";

import { FoodData } from "../../types/foods";

export const getStaticPaths: GetStaticPaths = async () => {
  // 1page目のindexページにリクエスト（paginationのtotal_pages取得用）
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodsIndexUrl}`,
    {
      params: {
        page: 1,
      },
    }
  );

  const totalPage = response.data.pagination.total_pages;

  // totalPageから作成するためのpathを生成(params:の形式で生成)
  const paths = Array.from(Array(totalPage).keys()).map((i) => ({
    params: { page: (i + 1).toString() },
  }));

  //paths（事前ビルド用のパス）、fallback(指定パス以外のアクセス時の挙動)を指定
  return { fallback: false, paths: paths };
};

// 上記のpathsで指定したページをSSGでフェッチ
export const getStaticProps: GetStaticProps = async (context) => {
  // パラメータで渡ってきたparams.pageをページネーションに使用
  const page = context.params?.page;
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodsIndexUrl}`,
    {
      params: {
        page: page,
      },
    }
  );

  return {
    props: {
      data: response.data,
    },
  };
};

const Index = ({ data }: { data: FoodData }) => {
  console.log(data);

  return (
    <RootLayout>
      <FoodIndex data={data} />
    </RootLayout>
  );
};

export default Index;

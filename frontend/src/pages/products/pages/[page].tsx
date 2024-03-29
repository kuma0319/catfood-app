//indexページをSSGで表示する場合の設計
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";

import CommonMeta from "@/components/commons/CommonMeta";
import RootLayout from "@/components/commons/Layout";
import FoodIndex from "@/components/products/FoodIndex";
import IndexPagination from "@/components/products/IndexPagination";
import { FoodIndexData } from "@/types/foods";
import { foodsIndexUrl } from "@/urls";

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
  if (page === undefined) {
    return {
      notFound: true,
    };
  } else {
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
        page: page,
      },
    };
  }
};

const Index = ({
  data,
  page,
}: {
  data: FoodIndexData;
  page: string | string[] | undefined;
}) => {
  const meta_title = "ねこまんま | キャットフード一覧";
  const meta_description =
    "ねこまんまのキャットフード一覧ページです。成分量やキーワードなど、様々な条件で絞り込み検索が可能です。";
  const meta_url = `https://www.nekomanmafood.com/products/pages/${page}`;
  return (
    <>
      <CommonMeta
        title={meta_title}
        description={meta_description}
        url={meta_url}
      />
      <RootLayout>
        <FoodIndex data={data} />
        <IndexPagination pagination={data.pagination} />
      </RootLayout>
    </>
  );
};

export default Index;

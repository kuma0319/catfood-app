//indexページがSSG設計の場合の商品検索結果の表示ページ
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import RootLayout from "@/components/commons/Layout";
import FoodIndex from "@/components/products/FoodIndex";
import SearchResultPagination from "@/components/products/SearchResultPagination";
import { foodSearchUrl } from "@/urls";

import { FoodData, FoodSearchParams } from "../../types/foods";

export const getServerSideProps: GetServerSideProps = async (router) => {
  const page = router.query.page || 1;
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodSearchUrl}`,
    {
      params: {
        ...router.query,
        page: page, // ページ番号をリクエストに追加
      },
    }
  );

  return {
    props: {
      data: response.data,
    },
  };
};

const SearchResults = ({ data }: { data: FoodData }) => {
  // indexページから受け取ったパラメータをsearchParamsにセット(検索ボックスの初期値設定用)
  const router = useRouter();
  const initialSearchParams = router.query as unknown as FoodSearchParams;

  return (
    <RootLayout>
      <FoodIndex data={data} initialSearchParams={initialSearchParams} />
      <SearchResultPagination pagination={data.pagination} />
    </RootLayout>
  );
};

export default SearchResults;

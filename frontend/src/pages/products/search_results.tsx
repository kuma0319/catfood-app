//indexページがSSG設計の場合の商品検索結果の表示ページ
import axios from "axios";
import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodIndex from "@/components/products/FoodIndex";
import { foodSearchUrl } from "@/urls";

import { FoodData } from "../../types/foods";

export const getServerSideProps: GetServerSideProps = async (router) => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodSearchUrl}`,
    {
      params: router.query,
    }
  );

  return {
    props: {
      data: response.data,
    },
  };
};

const SearchResults = ({ data }: { data: FoodData }) => {
  return (
    <RootLayout>
      <FoodIndex data={data} />
    </RootLayout>
  );
};

export default SearchResults;

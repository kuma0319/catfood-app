import axios from "axios";
import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/FoodItem";
import FoodSearch from "@/components/FoodSearch";

import { FoodData } from "../../../types/foods";

export const getServerSideProps: GetServerSideProps = async (router) => {
  const response = await axios.get(
    "http://backend:3010/api/v1/foods/search.json",
    { params: router.query }
  );

  return {
    props: {
      data: response.data,
    },
  };
};

interface Props {
  data: FoodData;
}

const SearchResults = ({ data }: Props) => {
  return (
    <RootLayout>
      <div className="px-4 py-6">
        <FoodSearch />
        <h1 className="mb-4 text-2xl font-bold">商品一覧</h1>
        <div className="mb-4 rounded border p-4 shadow-md">
          {data.map((food) => (
            <FoodItem key={food.id} food={food} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default SearchResults;

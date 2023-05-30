import axios from "axios";
import { GetStaticProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/FoodItem";
import FoodSearch from "@/components/search_form/FoodSearch";
import { foodsIndexUrl, SSR_BASE_URL } from "@/urls";

import { FoodData } from "../../../types/foods";

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(`${SSR_BASE_URL}${foodsIndexUrl}`);

  return {
    props: {
      data: response.data,
    },
  };
};

interface Props {
  data: FoodData;
}

const FoodsIndex = ({ data }: Props) => {
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

export default FoodsIndex;

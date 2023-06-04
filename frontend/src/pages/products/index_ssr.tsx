//indexページをSSRで表示する場合の設計
import axios from "axios";
import { GetServerSideProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/FoodItem";
import FoodSearch_SSR from "@/components/search_form/FoodSearch_ssr";
import { foodSearchUrl, foodsIndexUrl, SSR_BASE_URL } from "@/urls";

import { FoodData } from "../../../types/foods";

export const getServerSideProps: GetServerSideProps = async (router) => {
  //stateでrouter.query(railsに渡すselectParams)が空のオブジェクトでないならsearchアクションからフェッチ
  if (Object.keys(router.query).length !== 0) {
    const response = await axios.get(`${SSR_BASE_URL}${foodSearchUrl}`, {
      params: router.query,
    });

    return {
      props: {
        data: response.data,
      },
    };
  }
  //stateでrouter.query(railsに渡すselectParams)がfalseならindexアクションからフェッチ
  else {
    const response = await axios.get(`${SSR_BASE_URL}${foodsIndexUrl}`);

    return {
      props: {
        data: response.data,
      },
    };
  }
};

interface Props {
  data: FoodData;
}

const FoodsIndex_SSR = ({ data }: Props) => {
  return (
    <RootLayout>
      <div className="flex px-4 py-6">
        <div style={{ flex: 1 }}>
          <FoodSearch_SSR />
        </div>
        <div style={{ flex: 4 }}>
          <div className="mb-4 rounded border p-4 shadow-md">
            {data.map((food) => (
              <FoodItem key={food.id} food={food} />
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default FoodsIndex_SSR;

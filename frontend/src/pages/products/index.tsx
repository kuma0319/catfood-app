//indexページをSSGで表示する場合の設計
import axios from "axios";
import { GetStaticProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/FoodItem";
import FoodSearch from "@/components/search_form/FoodSearch";
import { useWatchList } from "@/hooks/useWatchList";
import { foodsIndexUrl, SSR_BASE_URL } from "@/urls";

import { FoodData } from "../../../types/foods";

//indexページをSSGでフェッチ
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
  //ウォッチリスト用のカスタムフック
  const { handleWatchList, watchListFoodId } = useWatchList();

  return (
    <RootLayout>
      <div className="flex px-4 py-6">
        <div style={{ flex: 1 }}>
          <FoodSearch />
        </div>
        <div style={{ flex: 4 }}>
          <div className="mb-4 rounded border p-4 shadow-md">
            {data.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                handleWatchList={handleWatchList}
              />
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default FoodsIndex;

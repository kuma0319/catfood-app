import { useContext } from "react";

import { WatchListContext } from "@/context/WatchListContext";
import { FoodData, FoodSearchParams } from "@/types/foods";

import FoodSearch from "../search_form/FoodSearch";
import FoodItem from "./FoodItem";

type FoodIndexProps = {
  data: FoodData;
  // SSG表示のproductsページから検索した際に検索パラメータを受け取る
  initialSearchParams?: FoodSearchParams;
};

const FoodIndex = ({ data, initialSearchParams }: FoodIndexProps) => {
  const context = useContext(WatchListContext);

  // WatchListContextはundefinedを戻り値として含むため、それの対策
  if (context === undefined) {
    throw new Error(
      "useWatchListは、WatchListProvider内で使用する必要があります。"
    );
  }

  //ウォッチリスト用のコンテキスト
  const { handleWatchList, setWatchListFoodId, watchListFoodId } = context;

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="px-4 py-6">
        <FoodSearch initialSearchParams={initialSearchParams} />
      </div>
      <p className="mx-4 text-base md:text-lg">{`ヒット件数：${data.pagination.total_count} 件`}</p>
      <div className="px-4 py-6">
        {data.foods_data.map((food) => (
          <FoodItem
            key={food.id}
            food={food}
            handleWatchList={handleWatchList}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodIndex;

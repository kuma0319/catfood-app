import { useContext, useEffect, useState } from "react";

import { WatchListContext } from "@/context/WatchListContext";
import { FoodData } from "@/types/foods";

import FoodSearch from "../search_form/FoodSearch";
import FoodItem from "./FoodItem";

const FoodIndex = ({ data }: { data: FoodData }) => {
  const context = useContext(WatchListContext);
  //マウントされたかどうかの状態管理
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="px-4 py-6">{mounted && <FoodSearch />}</div>
      <p className="mx-4 text-base md:text-lg">{`ヒット件数：${data.length} 件`}</p>
      <div className="px-4 py-6">
        {data.map((food) => (
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

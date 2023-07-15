import { useContext } from "react";

import FoodItem from "@/components/FoodItem";
import { WatchListContext } from "@/context/WatchListContext";
import { Food } from "@/types/foods";

const FoodDetail = ({ food }: { food: Food }) => {
  const context = useContext(WatchListContext);

  // WatchListContextはundefinedを戻り値として含むため、それの対策
  if (context === undefined) {
    throw new Error(
      "useWatchListは、WatchListProvider内で使用する必要があります。"
    );
  }

  //ウォッチリスト用のコンテキスト
  const { handleWatchList } = context;

  return (
    <FoodItem key={food.id} food={food} handleWatchList={handleWatchList} />
  );
};

export default FoodDetail;

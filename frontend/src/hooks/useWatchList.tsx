import { useEffect, useState } from "react";

type FoodIdArray = { id: number }[];

export const useWatchList = () => {
  //ウォッチリスト用の状態管理
  const [watchListFoodId, setWatchListFoodId] = useState<FoodIdArray>([]);

  //各商品のウォッチリストボタン押下によってウォッチリスト用の配列に格納
  const handleWatchList = (id: number, isWatched: boolean) => {
    setWatchListFoodId((prevWatchListFoodId) => {
      //ボタンがtrue時にそのidをウォッチリスト用の配列に格納
      if (isWatched) {
        return [...prevWatchListFoodId, { id }];
      }
      //ボタンがfalse時にそのidをウォッチリスト用の配列から削除
      else {
        return prevWatchListFoodId.filter((watchListFoodId) => {
          return watchListFoodId.id !== id;
        });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("food_id", JSON.stringify(watchListFoodId));
  }, [watchListFoodId]);

  return { handleWatchList, watchListFoodId };
};

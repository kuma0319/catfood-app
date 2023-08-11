import axios from "axios";
import { useContext, useEffect, useState } from "react";

import RootLayout from "@/components/commons/Layout";
import WatchListTable from "@/components/WatchListTable";
import { WatchListContext } from "@/context/WatchListContext";
import { FoodData } from "@/types/foods";
import { watchListUrl } from "@/urls";

const WatchList = () => {
  const context = useContext(WatchListContext);

  // WatchListContextはundefinedを戻り値として含むため、それの対策
  if (context === undefined) {
    throw new Error("useWatchList must be used within a WatchListProvider");
  }

  //ウォッチリスト用のコンテキスト
  const { handleWatchList, setWatchListFoodId, watchListFoodId } = context;

  // APIから取得したデータを保存するステート
  const [foodData, setFoodData] = useState<FoodData>([]);

  useEffect(() => {
    console.log(localStorage.getItem("food_id"));

    if (localStorage !== null) {
      setWatchListFoodId(() => JSON.parse(localStorage.getItem("food_id")!));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (watchListFoodId.length !== 0) {
        try {
          const response = await axios.get(
            // 環境に応じてリクエスト先を変えられるように、環境変数からリクエストパスを読み込み
            `${process.env.NEXT_PUBLIC_BACKEND_URL}${watchListUrl}`,
            {
              params: { ids: watchListFoodId },
            }
          );
          // レスポンスデータをステートに保存
          setFoodData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [watchListFoodId]);

  return (
    <RootLayout>
      <WatchListTable foodData={foodData} handleWatchList={handleWatchList} />
    </RootLayout>
  );
};
export default WatchList;

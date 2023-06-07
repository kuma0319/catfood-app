import axios from "axios";
import { useEffect, useState } from "react";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/FoodItem";
import { useWatchList } from "@/hooks/useWatchList";

import { FoodData } from "../../types/foods";

const GetWatchList = () => {
  //ウォッチリスト用のカスタムフック
  const { handleWatchList, setWatchListFoodId, watchListFoodId } =
    useWatchList();

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
            `http://localhost:3010/api/v1/foods/watch_lists.json`,
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
      <div className="flex px-4 py-6">
        <div style={{ flex: 4 }}>
          <div className="mb-4 rounded border p-4 shadow-md">
            {foodData.map((food) => (
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

export default GetWatchList;

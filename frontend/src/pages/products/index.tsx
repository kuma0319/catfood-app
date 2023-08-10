//indexページをSSGで表示する場合の設計
import axios from "axios";
import { GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/products/FoodItem";
import FoodSearch from "@/components/search_form/FoodSearch";
import { WatchListContext } from "@/context/WatchListContext";
import { foodsIndexUrl } from "@/urls";

import { FoodData } from "../../types/foods";

//indexページをSSGでフェッチ
export const getStaticProps: GetStaticProps = async () => {
  // 環境に応じてリクエスト先を変えられるように、環境変数からリクエストパスを読み込み
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodsIndexUrl}`
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

const TestIndex = ({ data }: Props) => {
  const context = useContext(WatchListContext);
  //マウントされたかどうかの状態管理
  const [mounted, setMounted] = useState(false);

  // WatchListContextはundefinedを戻り値として含むため、それの対策
  if (context === undefined) {
    throw new Error(
      "useWatchListは、WatchListProvider内で使用する必要があります。"
    );
  }

  //ウォッチリスト用のコンテキスト
  const { handleWatchList, setWatchListFoodId, watchListFoodId } = context;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <RootLayout>
      <div className="mx-auto max-w-screen-md">
        <div className="px-4 py-6">{mounted && <FoodSearch />}</div>
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
    </RootLayout>
  );
};

export default TestIndex;

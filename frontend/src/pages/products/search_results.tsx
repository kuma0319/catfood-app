//indexページがSSG設計の場合の商品検索結果の表示ページ
import axios from "axios";
import { GetServerSideProps } from "next";
import { useContext } from "react";

import RootLayout from "@/components/commons/Layout";
import FoodItem from "@/components/FoodItem";
import FoodSearch from "@/components/search_form/FoodSearch";
import { WatchListContext } from "@/context/WatchListContext";
import { foodSearchUrl } from "@/urls";

import { FoodData } from "../../types/foods";

export const getServerSideProps: GetServerSideProps = async (router) => {
  // 環境に応じてリクエスト先を変えられるように、環境変数からリクエストパスを読み込み
  const response = await axios.get(`${process.env.BACKEND_URL}${foodSearchUrl}`, {
    params: router.query,
  });

  return {
    props: {
      data: response.data,
    },
  };
};

interface Props {
  data: FoodData;
}

const SearchResults = ({ data }: Props) => {
  const context = useContext(WatchListContext);

  // WatchListContextはundefinedを戻り値として含むため、それの対策
  if (context === undefined) {
    throw new Error("useWatchList must be used within a WatchListProvider");
  }

  //ウォッチリスト用のコンテキスト
  const { handleWatchList, setWatchListFoodId, watchListFoodId } = context;

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

export default SearchResults;

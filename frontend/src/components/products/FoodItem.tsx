import Image from "next/image";
import Link from "next/link";

import { Food } from "../../types/foods";
import WatchListButton from "../WatchListButton";
import ItemTab from "./ItemTab";

export interface FoodProps {
  food: Food;
  handleWatchList?: (id: number, isWatched: boolean) => void;
}

const FoodItem = ({ food, handleWatchList }: FoodProps) => {
  return (
    <div className="grid grid-cols-6 grid-rows-5 gap-2 rounded border border-gray-300 p-4 shadow-md">
      <div className="col-span-2 row-span-2 flex items-center justify-center">
        <Link href="/products/[id]" as={`/products/${food.id}`}>
          {food.medium_image_url ? (
            <Image
              src={food.medium_image_url}
              width={128}
              height={128}
              alt="商品画像"
              unoptimized={
                process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION === "true"
              } // 開発環境はtrueとする
            />
          ) : (
            <div>No Image</div>
          )}
        </Link>
      </div>
      {/* ウォッチリストボタンが不要なコンポーネントには非表示 */}
      <div className="col-span-4 col-start-3 flex items-center justify-end">
        {handleWatchList ? (
          <WatchListButton
            id={food.id}
            handleWatchList={handleWatchList}
            trueWatchButtonName="ウォッチリスト追加済み"
          />
        ) : null}
      </div>
      <h1 className="col-span-4 col-start-3 row-start-2 self-start text-left text-sm font-semibold">
        {food.name}
      </h1>
      <div className="col-span-6 row-span-3 row-start-3">
        <ItemTab item={food} />
      </div>
    </div>
  );
};

export default FoodItem;

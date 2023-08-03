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
    <div className="grid grid-cols-4 gap-4 rounded border border-gray-300 p-4 shadow-md">
      <h1 className="col-span-2 self-start text-left text-xl font-semibold">
        {food.name}
      </h1>
      {/* ウォッチリストボタンが不要なコンポーネントには非表示 */}
      <div className="col-span-2 flex items-center justify-end gap-4">
        {handleWatchList ? (
          <WatchListButton
            id={food.id}
            handleWatchList={handleWatchList}
            trueWatchButtonName="追加済み"
          />
        ) : null}
      </div>
      <div className="col-span-1 row-span-2 flex items-center justify-center">
        <Link href="/products/[id]" as={`/products/${food.id}`}>
          {food.medium_image_url ? (
            <Image
              src={food.medium_image_url}
              width={128}
              height={128}
              alt="商品画像"
              unoptimized //※※本番環境では使用しない※※
            />
          ) : (
            // 代替コンテンツ、例えばデフォルトの画像などをここで提供できます
            <div>No Image</div>
          )}
        </Link>
      </div>
      <div className="col-span-3 row-span-2">
        <ItemTab item={food} />
      </div>
    </div>
  );
};

export default FoodItem;

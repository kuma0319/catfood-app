import Image from "next/image";
import Link from "next/link";

import { Food } from "../types/foods";
import ItemTab from "./ItemTab";
import WatchListButton from "./WatchListButton";

export interface FoodProps {
  food: Food;
  handleWatchList: (id: number, isWatched: boolean) => void;
}

const FoodItem = ({ food, handleWatchList }: FoodProps) => {
  function imageUrl() {
    if (food.image_urls) {
      return food.image_urls[0];
    } else {
      return "https://via.placeholder.com/150";
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4 rounded border border-gray-300 p-4 shadow-md">
      <h1 className="col-span-2 self-start text-left text-xl font-semibold">
        {food.name}
      </h1>
      <WatchListButton
        id={food.id}
        handleWatchList={handleWatchList}
        trueWatchButtonName="追加済み"
      />
      <div className="col-span-1 row-span-2 flex items-center justify-center">
        <Link href="/products/[id]" as={`/products/${food.id}`}>
          <Image
            src={imageUrl()}
            width={100}
            height={100}
            alt="商品画像"
            unoptimized //※※本番環境では使用しない※※
          />
        </Link>
      </div>
      <div className="col-span-3 row-span-2">
        <ItemTab item={food} />
      </div>
    </div>
  );
};

export default FoodItem;

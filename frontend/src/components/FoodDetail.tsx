import Image from "next/image";

import { Food } from "../types/foods";
import ItemTab from "./ItemTab";

interface FoodProps {
  food: Food;
}

const FoodDetail = ({ food }: FoodProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 rounded border border-gray-300 p-4 shadow-md">
      <h1 className="col-span-1 text-xl font-semibold">{food.name}</h1>
      <div className="col-span-2 row-span-4">
        <ItemTab item={food} />
      </div>
      <div className="col-span-1 row-span-3">
        <Image
          src={food.medium_image_url}
          width={150}
          height={150}
          alt="商品画像"
          unoptimized //※※本番環境では使用しない※※
        />
      </div>
    </div>
  );
};

export default FoodDetail;

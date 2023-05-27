import { foodDetailTest } from "@/urls";

import { Food } from "./foods";

const fetchFoodDetail = async (): Promise<Food> => {
  //APIから生データをフェッチ
  const response = await fetch(foodDetailTest);
  //JSONデータとして解釈
  const result = (await response.json()) as Food;
  return result;
};

export default fetchFoodDetail;

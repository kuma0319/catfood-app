import { food_typesIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface FoodType {
  id: number;
  food_type: string;
}

//配列の定義
export type FoodTypeData = FoodType[];

//JSONデータの形式そのもの
interface FoodTypeResponse {
  food_types: FoodTypeData;
}

const fetchFoodTypes = async (): Promise<FoodTypeData> => {
  //APIから生データをフェッチ
  const response = await fetch(food_typesIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as FoodTypeResponse;
  return result.food_types;
};

export default fetchFoodTypes;

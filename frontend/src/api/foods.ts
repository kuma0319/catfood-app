import { foodsIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface Food {
  id: number;
  name: string;
  brand_id: number;
  calorie: number;
  food_type_id: number;
  ingredients: string;
  production_area_id: number;
}

//配列の定義
export type FoodData = Food[];

//JSONデータの形式そのもの
interface FoodResponse {
  foods: FoodData;
}

const fetchFoods = async (): Promise<FoodData> => {
  //APIから生データをフェッチ
  const response = await fetch(foodsIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as FoodResponse;
  return result.foods;
};

export default fetchFoods;

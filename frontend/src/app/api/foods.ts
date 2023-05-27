import { foodsIndex } from "@/urls";

//配列の中身のプロパティの型定義
export interface Nutrient {
  content: number;
  nutrient: {
    id: number;
    name: string;
  };
}

export interface Amounts {
  id: number;
  amount: number;
  price: number;
}

export interface Food {
  id: number;
  name: string;
  amounts: Amounts[];
  brand: {
    id: number;
    name: string;
  };
  calorie: number;
  food_type: {
    id: number;
    name: string;
  };
  image_urls: string[];
  ingredients: string;
  nutrient_contents: Nutrient[];
  production_area: {
    id: number;
    name: string;
  };
}

//JSONデータの形式そのもの
export type FoodData = Food[];

const fetchFoods = async (): Promise<FoodData> => {
  //APIから生データをフェッチ
  const response = await fetch(foodsIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as FoodData;
  return result;
};

export default fetchFoods;

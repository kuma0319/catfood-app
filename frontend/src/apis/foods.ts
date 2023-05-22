import { foodsIndex } from "@/urls";

interface Foods {
  id: number;
  name: string;
  brand_id: number;
  calorie: number;
  food_type_id: number;
  ingredients: string;
  production_area_id: number;
}

type FoodsData = Foods[];

const fetchFoods = async (): Promise<FoodsData> => {
  //APIから生データをフェッチ
  const response = await fetch(foodsIndex);
  //JSONデータとして解釈
  const data = (await response.json()) as FoodsData;
  return data;
};

export default fetchFoods;

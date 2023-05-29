//フード成分の型定義
export interface Nutrient {
  content: number;
  nutrient: {
    id: number;
    name: string;
  };
}

//内容量及び価格の型定義
export interface Amounts {
  id: number;
  amount: number;
  price: number;
}

//商品そのものの型定義
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

//商品の配列(index)用
export type FoodData = Food[];

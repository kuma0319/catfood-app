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

//商品検索用のparams
export interface FoodSearchParams {
  brand_id: string[];
  food_name: string[];
  ingredients: string[];
  max_amount: string;
  max_ash_content: string;
  max_calorie: string;
  max_fat_content: string;
  max_fibre_content: string;
  max_moisture_content: string;
  max_price: string;
  max_protein_content: string;
  min_amount: string;
  min_ash_content: string;
  min_calorie: string;
  min_fat_content: string;
  min_fibre_content: string;
  min_moisture_content: string;
  min_price: string;
  min_protein_content: string;
  not_food_name: string[];
  not_ingredients: string[];
  production_area_id: string[];
}

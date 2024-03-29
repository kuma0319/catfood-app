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
}

//商品そのものの型定義
export interface Food {
  id: number;
  name: string;
  add_date: string;
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
  ingredients: string;
  max_price: number;
  median_price: number;
  medium_image_url: string;
  min_price: number;
  nutrient_contents: Nutrient[];
  production_area: {
    id: number;
    name: string;
  };
  rakuten_item_code: string;
  rakuten_name: string;
  target_age: {
    id: number;
    name: string;
  };
}

export interface Pagination {
  current_page: number;
  limit_value: number;
  next_page: number;
  offset_value: number;
  prev_page: number;
  total_count: number;
  total_pages: number;
}

// 商品ページ一覧用
export interface FoodData {
  foods_data: Food[];
}

export interface FoodIndexData {
  foods_data: Food[];
  pagination: Pagination;
}

//商品検索用のparams
export interface FoodSearchParams {
  brand_id: string[];
  food_name: string[];
  ingredients: string[];
  max_amount: string;
  max_ash_content: string;
  max_calorie: string;
  max_carbohydrates_content: string;
  max_fat_content: string;
  max_fibre_content: string;
  max_moisture_content: string;
  max_price: string;
  max_protein_content: string;
  min_amount: string;
  min_ash_content: string;
  min_calorie: string;
  min_carbohydrates_content: string;
  min_fat_content: string;
  min_fibre_content: string;
  min_moisture_content: string;
  min_price: string;
  min_protein_content: string;
  not_food_name: string[];
  not_ingredients: string[];
  production_area_id: string[];
  target_age_id: string[];
}

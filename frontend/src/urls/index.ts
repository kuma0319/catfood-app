export const CSR_BASE_URL = "http://localhost:3010/api/v1";
export const SSR_BASE_URL = "http://backend:3010/api/v1";

//Foodモデル用
export const foodsIndexUrl = `/foods/foods.json`;

export const foodDetailUrl = (foodId: number): string => {
  return `/foods/foods/${foodId}.json`;
};

export const foodSearchUrl = `/foods/search.json`;

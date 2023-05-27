const DEFAULT_API_LOCALHOST = "http://localhost:3010/api/v1/foods";

export const foodsIndex = `${DEFAULT_API_LOCALHOST}/foods.json`;

export const foodDetail = (foodId: number): string => {
  return `${DEFAULT_API_LOCALHOST}/foods/${foodId}.json`;
};

export const foodDetailTest = `${DEFAULT_API_LOCALHOST}/foods/1.json`;

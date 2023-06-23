export const foodsIndexUrl = `/api/v1/foods/foods.json`;

export const foodDetailUrl = (foodId: number): string => {
  return `/api/v1/foods/foods/${foodId}.json`;
};

export const foodSearchUrl = `/api/v1/foods/search.json`;

export const watchListUrl = `/api/v1/foods/watch_lists.json`;

export const authUrl = `/api/v1/auth`;

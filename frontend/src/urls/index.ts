// キャットフード一覧
export const foodsIndexUrl = `/api/v1/foods/foods.json`;
// キャットフード詳細
export const foodDetailUrl = (foodId: number): string => {
  return `/api/v1/foods/foods/${foodId}.json`;
};
// キャットフード検索
export const foodSearchUrl = `/api/v1/foods/search.json`;
// キャットフードのウォッチリストページ
export const watchListUrl = `/api/v1/foods/watch_lists.json`;
// devise_token_auth用
export const authUrl = `/api/v1/auth`;
export const authPasswordUrl = `/api/v1/auth/password`;
export const authSignInUrl = `/api/v1/auth/sign_in`;
export const authSignOutUrl = `/api/v1/auth/sign_out`;
// ユーザーページ
export const userUrl = `/api/v1/users/users`;

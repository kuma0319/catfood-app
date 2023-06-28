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
// 認証系
export const authUrl = `/api/v1/auth`;
export const authSignInUrl = `/api/v1/auth/sign_in`;
export const authSignOutUrl = `/api/v1/auth/sign_out`;
// ユーザーページ
export const userUrl = `/api/v1/users/users`;

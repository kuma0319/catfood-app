// キャットフード関連
export const foodsIndexUrl = `/api/v1/foods/foods.json`;
export const foodDetailUrl = (foodId: number): string => {
  return `/api/v1/foods/foods/${foodId}.json`;
};
export const foodsIndexIdsUrl = `/api/v1/foods/index_ids`;
export const foodSearchUrl = `/api/v1/foods/search.json`;

// ウォッチリスト関連
export const watchListUrl = `/api/v1/foods/watch_lists.json`;

// ユーザーページ関連
export const userUrl = `/api/v1/users/users`;

// お気に入りフード関連
export const favoriteFoodUrl = `/api/v1/favorites.json`;
export const favoriteFoodIdsUrl = `/api/v1/favorite_food_ids`;

// 商品レビュー関連
export const reviewsUrl = `/api/v1/reviews`;
export const productReviewsUrl = `/api/v1/reviews.json`;
export const userReviewsUrl = `/api/v1/user_reviews.json`;
export const reviewDetailUrl = (reviewId: string) => {
  return `/api/v1/reviews/${reviewId}.json`;
};

// ご飯相談所関連
export const questionsUrl = `/api/v1/questions`;
export const questionIndexUrl = `/api/v1/questions.json`;
export const questionDetailUrl = (questionId: string) => {
  return `/api/v1/questions/${questionId}.json`;
};
export const questionDeleteUrl = (questionId: string) => {
  return `/api/v1/questions/${questionId}`;
};
export const userQuestionsUrl = `/api/v1/user_questions`;
export const answersUrl = `/api/v1/answers`;
export const answerDeleteUrl = (answerId: string) => {
  return `/api/v1/answers/${answerId}`;
};

// devise_token_auth用
export const authUrl = `/api/v1/auth`;
export const authValidateTokenUrl = `/api/v1/auth/validate_token`;
export const authPasswordUrl = `/api/v1/auth/password`;
export const authSignInUrl = `/api/v1/auth/sign_in`;
export const authSignOutUrl = `/api/v1/auth/sign_out`;

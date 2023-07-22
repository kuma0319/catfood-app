import React from "react";

// selectedの真偽値によって星の色を切り替える(trueならイエロー、falseならグレー)
const Star = ({ onSelect = () => {}, selected = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-10 w-10 ${selected ? "text-yellow-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    onClick={onSelect}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// 各評価項目におけるstate管理用のpropsを受け取る。
const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (value: number) => void;
}) => {
  const totalStars = 5;

  return (
    <div className="-ml-1 flex gap-0.5">
      {/* 評価に必要な星の数だけ空配列を作成 */}
      {[...Array(totalStars)].map((_, i) => (
        // 上記の配列に対しStarコンポーネントを適用
        // selectedで選択されている星がこの星のインデックスよりも大きいかどうかを管理(星を塗りつぶすために必要)
        // 星が選択されたらsetRatingでstateを更新
        <Star key={i} selected={rating > i} onSelect={() => setRating(i + 1)} />
      ))}
    </div>
  );
};

export default StarRating;

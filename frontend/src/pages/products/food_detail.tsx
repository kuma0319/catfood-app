// import fetchFoodDetail from "@/app/api/food_detail";
// import { Food } from "@/app/api/foods";

// interface FoodDetailProps {
//     food: Food
// }

// const DetailProps = async (): Promise<FoodDetailProps> => {
//   const allFood = await fetchFoodDetail();

//   return (
//     props: {
//       allFood: Food
//     }
//   );
// };

// const FoodDetail = ({food}) => {
//   return (
//     <div>
//       <h1>{props.food.name}</h1>
//       <p>{props.food.description}</p>
//     </div>
//   )
// }

// export default FoodDetail;

////仮記述
// import { Food } from "@/app/api/foods";
// import { foodDetailTest } from "@/urls";

// const fetchFoodDetail = async (): Promise<Food> => {
//   //APIから生データをフェッチ
//   const response = await fetch(foodDetailTest);
//   //JSONデータとして解釈
//   const result = (await response.json()) as Food;
//   return result;
// };

// const TestComponent = async () => {
//   const food = await fetchFoodDetail();
//   return (
//     <div>
//       <h1>{food.name}</h1>
//     </div>
//   );
// };

// export default TestComponent;
"use client";

import { useEffect, useState } from "react";

import { Food } from "@/apis/foods";
import { foodDetailTest } from "@/urls";

const fetchFoodDetail = async (): Promise<Food> => {
  //APIから生データをフェッチ
  const response = await fetch(foodDetailTest);
  //JSONデータとして解釈
  const result = (await response.json()) as Food;
  return result;
};

const FoodDetail = () => {
  const [food, setFood] = useState<Food>();

  useEffect(() => {
    fetchFoodDetail().then((res) => {
      setFood(res);
    });
  }, []);

  return (
    <div className="px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">商品一覧</h1>
      <div className="mb-4 rounded border p-4 shadow-md">{food?.name}</div>
    </div>
  );
};

export default FoodDetail;

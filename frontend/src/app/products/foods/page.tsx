"use client";

import { useEffect, useState } from "react";

import fetchFoods, { FoodData } from "@/api/foods";

const FoodsIndex = () => {
  const [foods, setFoods] = useState<FoodData>([]);

  useEffect(() => {
    fetchFoods().then((res) => {
      setFoods(res);
    });
  }, []);

  return (
    <div>
      <h1>商品一覧</h1>
      {foods.map((food) => (
        <div key={food.id}>
          <h2>{food.name}</h2>
          <p>原材料: {food.ingredients}</p>
          <p>カロリー: {food.calorie}</p>
          <p>ブランド: {food.brand.name}</p>
          <p>食品タイプ: {food.food_type.name}</p>
          <p>生産地域: {food.production_area.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodsIndex;

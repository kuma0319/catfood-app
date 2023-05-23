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
          <p>カロリー: {food.calorie}</p>
          <p>成分: {food.ingredients}</p>
          <p>ブランドID: {food.brand_id}</p>
          <p>食品タイプID: {food.food_type_id}</p>
          <p>生産地域ID: {food.production_area_id}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodsIndex;

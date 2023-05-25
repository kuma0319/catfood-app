"use client";

import { useEffect, useState } from "react";

import fetchFoods, { FoodData } from "@/api/foods";
import FoodItem from "@/components/FoodItem";

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
        <FoodItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodsIndex;

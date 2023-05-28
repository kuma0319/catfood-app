"use client";

import { useEffect, useState } from "react";

import fetchFoods, { FoodData } from "@/apis/foods";
import FoodItem from "@/components/FoodItem";
import RootLayout from "@/components/Layout";

const FoodsIndex = () => {
  const [foods, setFoods] = useState<FoodData>([]);

  useEffect(() => {
    fetchFoods().then((res) => {
      setFoods(res);
    });
  }, []);

  return (
    <RootLayout>
      <div className="px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">商品一覧</h1>
        <div className="mb-4 rounded border p-4 shadow-md">
          {foods.map((food) => (
            <FoodItem key={food.id} food={food} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default FoodsIndex;
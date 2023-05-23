"use client";

import { useEffect, useState } from "react";

import fetchFoodTypes, { FoodTypeData } from "@/api/food_types";

const FoodTypesIndex = () => {
  const [food_types, setFoodTypes] = useState<FoodTypeData>([]);

  useEffect(() => {
    fetchFoodTypes().then((res) => {
      setFoodTypes(res);
    });
  }, []);

  return (
    <div>
      <h1>フードタイプ一覧</h1>
      {food_types.map((food_type) => (
        <div key={food_type.id}>
          <h2>フードタイプ: {food_type.food_type}</h2>
        </div>
      ))}
    </div>
  );
};

export default FoodTypesIndex;

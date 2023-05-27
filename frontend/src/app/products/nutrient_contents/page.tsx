"use client";

import { useEffect, useState } from "react";

import fetchNutrientContents, {
  NutrientContentData,
} from "@/api/nutrient_contents";

const NutrientContentsIndex = () => {
  const [nutrient_contents, setNutrientContents] =
    useState<NutrientContentData>([]);

  useEffect(() => {
    fetchNutrientContents().then((res) => {
      setNutrientContents(res);
    });
  }, []);

  return (
    <div>
      <h1>商品一覧</h1>
      {nutrient_contents.map((nutrient_content) => (
        <div key={nutrient_content.id}>
          <p>商品ID: {nutrient_content.food_id}</p>
          <p>成分ID: {nutrient_content.nutrient_id}</p>
          <p>成分含有量: {nutrient_content.nutrient_content}</p>
        </div>
      ))}
    </div>
  );
};

export default NutrientContentsIndex;

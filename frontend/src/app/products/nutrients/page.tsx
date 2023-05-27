"use client";

import { useEffect, useState } from "react";

import fetchNutrients, { NutrientData } from "@/api/nutrients";

const NutrientsIndex = () => {
  const [nutrients, setNutrients] = useState<NutrientData>([]);

  useEffect(() => {
    fetchNutrients().then((res) => {
      setNutrients(res);
    });
  }, []);

  return (
    <div>
      <h1>成分一覧</h1>
      {nutrients.map((nutrient) => (
        <div key={nutrient.id}>
          <h2>成分: {nutrient.nutrient}</h2>
        </div>
      ))}
    </div>
  );
};

export default NutrientsIndex;

"use client";

import { useEffect, useState } from "react";

import fetchProductionAreas, {
  ProductionAreaData,
} from "@/api/production_areas";

const ProductionAreasIndex = () => {
  const [production_areas, setProductionAreas] = useState<ProductionAreaData>(
    []
  );

  useEffect(() => {
    fetchProductionAreas().then((res) => {
      setProductionAreas(res);
    });
  }, []);

  return (
    <div>
      <h1>産地一覧</h1>
      {production_areas.map((production_area) => (
        <div key={production_area.id}>
          <h2>産地: {production_area.production_area}</h2>
        </div>
      ))}
    </div>
  );
};

export default ProductionAreasIndex;

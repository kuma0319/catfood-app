"use client";

import { useEffect, useState } from "react";

import fetchBrands, { BrandData } from "@/api/brands";

const BrandsIndex = () => {
  const [brands, setBrands] = useState<BrandData>([]);

  useEffect(() => {
    fetchBrands().then((res) => {
      setBrands(res);
    });
  }, []);

  return (
    <div>
      <h1>ブランド一覧</h1>
      {brands.map((brand) => (
        <div key={brand.id}>
          <h2>ブランド: {brand.brand}</h2>
        </div>
      ))}
    </div>
  );
};

export default BrandsIndex;

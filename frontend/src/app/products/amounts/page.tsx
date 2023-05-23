"use client";

import { useEffect, useState } from "react";

import fetchAmounts, { AmountData } from "@/api/amounts";

const AmountsIndex = () => {
  const [amounts, setAmounts] = useState<AmountData>([]);

  useEffect(() => {
    fetchAmounts().then((res) => {
      setAmounts(res);
    });
  }, []);

  return (
    <div>
      <h1>価格一覧</h1>
      {amounts.map((amount) => (
        <div key={amount.id}>
          <p>商品ID: {amount.food_id}</p>
          <p>内容量: {amount.amount}</p>
          <p>価格: {amount.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AmountsIndex;

"use client";

import { useEffect } from "react";

import fetchFoods from "@/apis/foods";

const FoodsIndex = () => {
  useEffect(() => {
    fetchFoods().then((res) => {
      console.log(res);
    });
  }, []);
};

export default FoodsIndex;

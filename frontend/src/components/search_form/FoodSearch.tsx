import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import { AMOUNT, BRAND, CALORIE, PRICE, PRODUCTION_AREA } from "@/constant";

import MatchOption from "./MatchOption";
import RangeOption from "./RangeOption";

const FoodSearch = () => {
  //Railsに渡すパラメータ用のstate管理
  const [selectParams, setSelectParams] = useState({
    brand_id: "",
    max_amount: "",
    max_calorie: "",
    max_nutrient_content: "",
    max_price: "",
    min_amount: "",
    min_calorie: "",
    min_nutrient_content: "",
    min_price: "",
    nutrient_id: "",
    production_area_id: "",
  });

  const router = useRouter();

  //タブ選択時のイベント
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //スプレッド演算子でparamsに更新された値をオブジェクトに追加
    setSelectParams({
      ...selectParams,
      [event.target.name]: event.target.value,
    });
  };

  //検索ボタン押下時のイベント
  const handleClick = () => {
    router.push({
      pathname: "/products/search_results",
      query: selectParams,
    });
    console.log(router.query);
  };

  return (
    <div>
      <MatchOption
        name="brand_id"
        label="ブランド"
        options={BRAND}
        handleChange={handleChange}
      />
      <MatchOption
        name="production_area_id"
        label="産地"
        options={PRODUCTION_AREA}
        handleChange={handleChange}
      />
      <RangeOption
        min_name="min_calorie"
        max_name="max_calorie"
        label="カロリー"
        range={CALORIE}
        unit="kcal/100g"
        handleChange={handleChange}
      />
      <RangeOption
        min_name="min_price"
        max_name="max_price"
        label="金額"
        range={PRICE}
        unit="円"
        handleChange={handleChange}
      />
      <RangeOption
        min_name="min_amount"
        max_name="max_amount"
        label="内容量"
        range={AMOUNT}
        unit="kg"
        handleChange={handleChange}
      />
      <button onClick={handleClick}>検索</button>
    </div>
  );
};

export default FoodSearch;

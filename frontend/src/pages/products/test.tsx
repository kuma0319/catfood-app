//indexページがSSG設計の場合の商品検索
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";

import Button from "@/components/search_form/Button";
import FoodSearchInput from "@/components/search_form/FoodSearchInput";
import MultipleOption from "@/components/search_form/MultipleOption";
import RangeOption from "@/components/search_form/RangeOption";
import {
  AMOUNT,
  BRAND,
  CALORIE,
  NUTRIENT_CONTENT,
  PRICE,
  PRODUCTION_AREA,
} from "@/constant";

interface Params {
  brand_id: string[];
  food_name: string[];
  ingredients: string[];
  max_amount: string;
  max_ash_content: string;
  max_calorie: string;
  max_fat_content: string;
  max_fibre_content: string;
  max_moisture_content: string;
  max_price: string;
  max_protein_content: string;
  min_amount: string;
  min_ash_content: string;
  min_calorie: string;
  min_fat_content: string;
  min_fibre_content: string;
  min_moisture_content: string;
  min_price: string;
  min_protein_content: string;
  not_food_name: string[];
  not_ingredients: string[];
  production_area_id: string[];
}

const FoodSearch = () => {
  //Railsに渡すパラメータ用のstate管理
  const [selectParams, setSelectParams] = useState<Params>({
    brand_id: [],
    food_name: [],
    ingredients: [],
    max_amount: "",
    max_ash_content: "",
    max_calorie: "",
    max_fat_content: "",
    max_fibre_content: "",
    max_moisture_content: "",
    max_price: "",
    max_protein_content: "",
    min_amount: "",
    min_ash_content: "",
    min_calorie: "",
    min_fat_content: "",
    min_fibre_content: "",
    min_moisture_content: "",
    min_price: "",
    min_protein_content: "",
    not_food_name: [],
    not_ingredients: [],
    production_area_id: [],
  });

  //キーワード入力用にキーワードとターゲットの名前管理
  const [keyWord, setKeyWord] = useState("");
  const [keyName, setKeyName] = useState("");

  const router = useRouter();

  //検索ボタン用の状態管理
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);

  //チェックボックス押下時のイベント
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    //targetが存在しない値を取らないようにkeyofを指定
    const target: keyof Params = event.target.name as keyof Params;

    //ブランドと産地のみの場合に処理実行
    if (target === "brand_id" || target === "production_area_id") {
      //チェックが入ると元の配列に格納
      if (event.target.checked) {
        setSelectParams({
          ...selectParams,
          [target]: [...selectParams[target], event.target.value],
        });
      }
      // チェックが外れると元の配列から削除
      else {
        setSelectParams({
          ...selectParams,
          [target]: [
            ...selectParams[target].filter(
              (item) => item !== event.target.value
            ),
          ],
        });
      }
    }
  };

  //タブ選択時のイベント
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //スプレッド演算子でparamsに更新された値をオブジェクトに追加
    setSelectParams({
      ...selectParams,
      [event.target.name]: event.target.value,
    });
  };

  //キーワード入力時のイベント
  const handleWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyName(event.target.name);
    setKeyWord(event.target.value);
  };

  //検索ボタン押下時のイベント
  const handleClick = () => {
    const target: keyof Params = keyName as keyof Params;

    if (
      target === "food_name" ||
      target === "not_food_name" ||
      target === "ingredients" ||
      target === "not_ingredients"
    ) {
      if (keyWord.length > 0) {
        setSelectParams({
          ...selectParams,
          [target]: [...selectParams[target], keyWord],
        });
      }
    }

    setSearchButtonPressed(true);
  };
  // console.log(selectParams);

  useEffect(() => {
    if (searchButtonPressed) {
      router.push({
        pathname: "/products/search_results",
        // "query"のTSの型定義だと型Paramsが弾かれる。（∵配列は受け入れない）
        // ※実際にはrails側の動作はparamsとして配列を許容するため、型アサーションで型を上書き。
        query: selectParams as unknown as ParsedUrlQueryInput,
      });
    }
    setSearchButtonPressed(false);
    // console.log(selectParams);
  }, [searchButtonPressed]);

  return (
    <div>
      <div>
        <MultipleOption
          name="brand_id"
          label="ブランド"
          items={BRAND}
          handleChange={handleCheckboxChange}
        />
        <MultipleOption
          name="production_area_id"
          label="産地"
          items={PRODUCTION_AREA}
          handleChange={handleCheckboxChange}
        />
      </div>
      <RangeOption
        min_name="min_calorie"
        max_name="max_calorie"
        label="カロリー"
        range={CALORIE}
        unit="kcal/100g"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_price"
        max_name="max_price"
        label="金額"
        range={PRICE}
        unit="円"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_amount"
        max_name="max_amount"
        label="内容量"
        range={AMOUNT}
        unit="kg"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_protein_content"
        max_name="max_protein_content"
        label="タンパク質"
        range={NUTRIENT_CONTENT}
        unit="%"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_fat_content"
        max_name="max_fat_content"
        label="脂質"
        range={NUTRIENT_CONTENT}
        unit="%"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_fibre_content"
        max_name="max_fibre_content"
        label="粗繊維"
        range={NUTRIENT_CONTENT}
        unit="%"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_ash_content"
        max_name="max_ash_content"
        label="灰分"
        range={NUTRIENT_CONTENT}
        unit="%"
        handleChange={handleSelectChange}
      />
      <RangeOption
        min_name="min_moisture_content"
        max_name="max_moisture_content"
        label="水分"
        range={NUTRIENT_CONTENT}
        unit="%"
        handleChange={handleSelectChange}
      />
      キーワード検索
      <FoodSearchInput
        name="food_name"
        handleChange={handleWordChange}
        label="このキーワードを「名前」に含める"
        placeholder="名前1 名前2..."
        value={keyWord}
      />
      <FoodSearchInput
        name="not_food_name"
        handleChange={handleWordChange}
        label={'このキーワードを「名前」に"含めない"'}
        placeholder="名前1 名前2..."
        value={keyWord}
      />
      <FoodSearchInput
        name="ingredients"
        handleChange={handleWordChange}
        label="このキーワードを「原材料」に含める"
        placeholder="原材料1 原材料2..."
        value={keyWord}
      />
      <FoodSearchInput
        name="not_ingredients"
        handleChange={handleWordChange}
        label={'このキーワードを「原材料」に"含めない"'}
        placeholder="原材料1 原材料2..."
        value={keyWord}
      />
      <div className="m-8 text-center">
        <Button name="検索" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default FoodSearch;

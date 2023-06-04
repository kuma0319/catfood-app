//indexページがSSG設計の場合の商品検索
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";

import { FoodSearchParams } from "../../types/foods";

const useFoodSearch = () => {
  //Railsに渡すパラメータ用のstate管理
  const [selectParams, setSelectParams] = useState<FoodSearchParams>({
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
  const [keyWords, setKeyWords] = useState({
    food_name: "",
    ingredients: "",
    not_food_name: "",
    not_ingredients: "",
  });

  //検索ボタン用の状態管理
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);

  const router = useRouter();

  //チェックボックス押下時のイベント
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    //targetが存在しない値を取らないようにkeyofを指定
    const target: keyof FoodSearchParams = event.target
      .name as keyof FoodSearchParams;

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
    setSelectParams({
      ...selectParams,
      [event.target.name]: event.target.value,
    });
  };

  //キーワード入力時のイベント
  const handleWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyWords({
      ...keyWords,
      [event.target.name]: event.target.value,
    });
  };

  //検索ボタン押下時のイベント
  const handleClick = () => {
    setSelectParams({
      ...selectParams,
      food_name: keyWords.food_name.split(/\s+|　+/), // スペース区切り（半角、全角含む）でkeyWordsを配列に格納
      ingredients: keyWords.ingredients.split(/\s+|　+/),
      not_food_name: keyWords.not_food_name.split(/\s+|　+/),
      not_ingredients: keyWords.not_ingredients.split(/\s+|　+/),
    });

    setSearchButtonPressed(true);
  };

  useEffect(() => {
    if (searchButtonPressed) {
      router.push({
        pathname: "/products/search_results",
        // "query"のTSの型定義だと型Paramsが弾かれる。（∵配列は受け入れない）
        // ※実際にはrails側の動作はparamsとして配列を許容するため、型アサーションで型を上書き。
        query: selectParams as unknown as ParsedUrlQueryInput,
      });
    }
    //ボタン押下後は、状態を再びfalseに戻しておく
    setSearchButtonPressed(false);
  }, [searchButtonPressed]);

  return {
    handleCheckboxChange,
    handleClick,
    handleSelectChange,
    handleWordChange,
    keyWords,
    router,
    searchButtonPressed,
    selectParams,
  };
};

export default useFoodSearch;

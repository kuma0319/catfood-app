//indexページがSSG設計の場合の商品検索
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";

import { FoodSearchParams } from "../types/foods";

// 引数に初期値を受け取るようにすることで、SSG側からもパラメータを引き継げるようにする
const useFoodSearch = (initialSearchParams?: FoodSearchParams) => {
  //Railsに渡すパラメータ用のstate管理
  const [selectParams, setSelectParams] = useState<FoodSearchParams>(
    initialSearchParams || {
      brand_id: [],
      food_name: [],
      ingredients: [],
      max_amount: "",
      max_ash_content: "",
      max_calorie: "",
      max_carbohydrates_content: "",
      max_fat_content: "",
      max_fibre_content: "",
      max_moisture_content: "",
      max_price: "",
      max_protein_content: "",
      min_amount: "",
      min_ash_content: "",
      min_calorie: "",
      min_carbohydrates_content: "",
      min_fat_content: "",
      min_fibre_content: "",
      min_moisture_content: "",
      min_price: "",
      min_protein_content: "",
      not_food_name: [],
      not_ingredients: [],
      production_area_id: [],
      target_age_id: [],
    }
  );

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

    // 配列で無い場合のエラー対策で全て配列化したcurrentValueとしておく
    // ここでは型アサーションによって、const currentValue: string | (string | string[])[]となることを防ぐ
    const currentValue = Array.isArray(selectParams[target])
      ? (selectParams[target] as string[])
      : ([selectParams[target]] as string[]);

    //ブランド、産地、年齢のみの場合に処理実行
    if (
      target === "brand_id" ||
      target === "production_area_id" ||
      target === "target_age_id"
    ) {
      //チェックが入ると元の配列に格納
      if (event.target.checked) {
        setSelectParams({
          ...selectParams,
          [target]: [...currentValue, event.target.value],
        });
      }
      // チェックが外れると元の配列から削除
      else {
        setSelectParams({
          ...selectParams,
          [target]: [
            ...currentValue.filter((item) => item !== event.target.value),
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

  // キーワード初期化用の副作用(ページ遷移しても検索ボックスの状態を保持する用)
  useEffect(() => {
    // URLのクエリパラメータからkeyWordsを初期化
    if (router.isReady) {
      setKeyWords({
        // クエリパラメータがある場合にその値で初期化する
        // キーワードのパラメータは文字列 or 文字列の配列のため、配列の場合はスペース区切りで文字列化
        food_name: Array.isArray(router.query.food_name)
          ? router.query.food_name.join(" ")
          : router.query.food_name || "",
        ingredients: Array.isArray(router.query.ingredients)
          ? router.query.ingredients.join(" ")
          : router.query.ingredients || "",
        not_food_name: Array.isArray(router.query.not_food_name)
          ? router.query.not_food_name.join(" ")
          : router.query.not_food_name || "",
        not_ingredients: Array.isArray(router.query.not_ingredients)
          ? router.query.not_ingredients.join(" ")
          : router.query.not_ingredients || "",
      });
    }
  }, [router]);

  // 検索ボタン押下時のイベント
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

  // 検索ボタン押下時の副作用
  useEffect(() => {
    if (searchButtonPressed) {
      // 空文字を除去したselectParamsを生成する(クエリパラメータに不要なものを含めない)
      const filteredParams = Object.fromEntries(
        // (3) フィルターしたキーと値の配列をオブジェクトに再変換
        Object.entries(selectParams).filter(([key, value]) => {
          // (1) オブジェクトをキーと値の配列に変換
          if (Array.isArray(value)) {
            // (2) 空文字の配列と空文字の文字列をfillterで除外
            return value.some((item) => item !== "");
          } else {
            return value !== "";
          }
        })
      );

      const query = {
        ...(filteredParams as unknown as ParsedUrlQueryInput),
        page: 1, // pagination用にpageのparamsを追加(初期ページとして1)
      };

      router.push({
        pathname: "/products/search_results",
        // "query"のTSの型定義だと型Paramsが弾かれる。（∵配列は受け入れない）
        // ※実際にはrails側の動作はparamsとして配列を許容するため、型アサーションで型を上書き。
        query: query,
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

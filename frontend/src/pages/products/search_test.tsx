import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

import FoodItem from "@/components/FoodItem";
import { BRAND, PRODUCTION_AREA } from "@/constant";

import { FoodData } from "../../../types/foods";

const SearchForm = () => {
  //Railsに渡すパラメータをselectParamsに格納
  const [selectParams, setSelectParams] = useState({
    brand_id: "",
    production_area_id: "",
  });

  //GETレスポンスの検索結果(response.data)を格納
  const [searchResults, setSearchResults] = useState<FoodData>([]);

  //タブ選択時のイベント
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //スプレッド演算子でparamsに更新された値をオブジェクトに追加
    setSelectParams({
      ...selectParams,
      [event.target.name]: event.target.value,
    });
  };

  //検索ボタン押下時のイベント
  useEffect(() => {
    const fetchSearch = async () => {
      const response = await axios.get(
        "http://localhost:3010/api/v1/foods/search.json",
        { params: selectParams }
      );
      setSearchResults(response.data);
    };

    console.log({ params: selectParams });

    if (selectParams) {
      fetchSearch();
    }
  }, [selectParams]);

  return (
    <div>
      <label>ブランド</label>
      <select onChange={handleChange} name="brand_id">
        <option defaultValue={""} value={""}>
          指定しない
        </option>
        {BRAND.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
      <label>産地</label>
      <select onChange={handleChange} name="production_area_id">
        <option defaultValue={""} value={""}>
          指定しない
        </option>
        {PRODUCTION_AREA.map((production_area) => (
          <option key={production_area.id} value={production_area.id}>
            {production_area.name}
          </option>
        ))}
      </select>

      <div className="px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">商品一覧</h1>
        <div className="mb-4 rounded border p-4 shadow-md">
          {searchResults.map((food) => (
            <FoodItem key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

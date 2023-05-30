import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

import { BRAND, PRODUCTION_AREA } from "@/constant";

import { FoodData } from "../../types/foods";

const FoodSearch = () => {
  //Railsに渡すパラメータ用のstate管理
  const [selectParams, setSelectParams] = useState({
    brand_id: "",
    production_area_id: "",
  });

  //GETレスポンスの検索結果用のstate管理
  const [searchResults, setSearchResults] = useState<FoodData>([]);

  //検索ボタン用のstate管理
  const [clicked, setClicked] = useState(false);

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

    if (clicked) {
      fetchSearch();
    }
  }, [clicked]);

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
      <button onClick={() => setClicked(true)}>検索</button>
    </div>
  );
};

export default FoodSearch;

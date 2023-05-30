import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

import { BRAND, PRODUCTION_AREA } from "@/constant";

const FoodSearch = () => {
  //Railsに渡すパラメータ用のstate管理
  const [selectParams, setSelectParams] = useState({
    brand_id: "",
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
      <button onClick={handleClick}>検索</button>
    </div>
  );
};

export default FoodSearch;

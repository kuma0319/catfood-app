import { Amounts, Nutrient } from "../../types/foods";

interface ItemTabList {
  id: number;
  amounts: Amounts[];
  brand: {
    id: number;
    name: string;
  };
  calorie: number;
  food_type: {
    id: number;
    name: string;
  };
  ingredients: string;
  median_price: number;
  nutrient_contents: Nutrient[];
  production_area: {
    id: number;
    name: string;
  };
}

interface ItemTab {
  item: ItemTabList;
}

const ItemTab = ({ item }: ItemTab) => {
  return (
    <>
      {/* Tab start */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="active -mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white hs-tab-active:text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-white"
            id={`card-type-tab-item-1-${item.id}`}
            data-hs-tab={`#card-type-tab-1-${item.id}`}
            aria-controls={`card-type-tab-1-${item.id}`}
            role="tab"
          >
            成分
          </button>
          <button
            type="button"
            className="-mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white hs-tab-active:text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-white"
            id={`card-type-tab-item-2-${item.id}`}
            data-hs-tab={`#card-type-tab-2-${item.id}`}
            aria-controls={`card-type-tab-2-${item.id}`}
            role="tab"
          >
            原材料
          </button>
          <button
            type="button"
            className="-mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white hs-tab-active:text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-white"
            id={`card-type-tab-item-3-${item.id}`}
            data-hs-tab={`#card-type-tab-3-${item.id}`}
            aria-controls={`card-type-tab-3-${item.id}`}
            role="tab"
          >
            その他
          </button>
        </nav>
      </div>
      {/* Tab end */}

      {/* Contents start */}
      <div className="mt-3 text-sm">
        <div
          id={`card-type-tab-1-${item.id}`}
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-1-${item.id}`}
        >
          <div className="text-gray-500 dark:text-gray-400">
            {item.nutrient_contents
              // 期待通りの並びになるようにid順にソート
              .sort((a, b) => a.nutrient.id - b.nutrient.id)
              .map((nutrient_content, index) => (
                <div key={index}>
                  {nutrient_content.nutrient.name}：{nutrient_content.content} %
                </div>
              ))}
          </div>
        </div>
        <div
          id={`card-type-tab-2-${item.id}`}
          className="hidden"
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-2-${item.id}`}
        >
          <div className="text-gray-500 dark:text-gray-400">
            {item.ingredients}
          </div>
        </div>
        <div
          id={`card-type-tab-3-${item.id}`}
          className="hidden"
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-3-${item.id}`}
        >
          <div className="text-gray-500 dark:text-gray-400">
            <p>ブランド：{item.brand.name}</p>
            <p>タイプ：{item.food_type.name}</p>
            <p>産地：{item.production_area.name}</p>
            <p>カロリー：{item.calorie} kcal/100g</p>
            <div>
              <p>内容量</p>
              {item.amounts.map((amount, index) => (
                <div key={index}>
                  <p>{amount.amount}kg</p>
                </div>
              ))}
            </div>
            <p>楽天市場平均価格：{item.median_price} 円</p>
          </div>
        </div>
      </div>
      {/* Contents end */}
    </>
  );
};

export default ItemTab;

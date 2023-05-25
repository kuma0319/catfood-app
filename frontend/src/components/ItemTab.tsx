import { Food } from "@/api/foods";

import("preline");

export default function ItemTab({
  id,
  name,
  amounts,
  brand,
  calorie,
  food_type,
  ingredients,
  nutrient_contents,
  production_area,
}: Food) {
  return (
    <>
      <h1>{name}</h1>
      {/* Tab start */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="active -mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white hs-tab-active:text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-white"
            id={`card-type-tab-item-1-${id}`}
            data-hs-tab={`#card-type-tab-1-${id}`}
            aria-controls={`card-type-tab-1-${id}`}
            role="tab"
          >
            成分
          </button>
          <button
            type="button"
            className="-mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white hs-tab-active:text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-white"
            id={`card-type-tab-item-2-${id}`}
            data-hs-tab={`#card-type-tab-2-${id}`}
            aria-controls={`card-type-tab-2-${id}`}
            role="tab"
          >
            原材料
          </button>
          <button
            type="button"
            className="-mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white hs-tab-active:text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:text-white"
            id={`card-type-tab-item-3-${id}`}
            data-hs-tab={`#card-type-tab-3-${id}`}
            aria-controls={`card-type-tab-3-${id}`}
            role="tab"
          >
            その他
          </button>
        </nav>
      </div>
      {/* Tab end */}

      {/* Contents start */}
      <div className="mt-3">
        <div
          id={`card-type-tab-1-${id}`}
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-1-${id}`}
        >
          <div className="text-gray-500 dark:text-gray-400">
            {nutrient_contents.map((nutrient_content, index) => (
              <div key={index}>
                {nutrient_content.nutrient.name}：{nutrient_content.content}g
              </div>
            ))}
          </div>
        </div>
        <div
          id={`card-type-tab-2-${id}`}
          className="hidden"
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-2-${id}`}
        >
          <div className="text-gray-500 dark:text-gray-400">
            <p>原材料</p>
            {ingredients}
          </div>
        </div>
        <div
          id={`card-type-tab-3-${id}`}
          className="hidden"
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-3-${id}`}
        >
          <div className="text-gray-500 dark:text-gray-400">
            <p>ブランド：{brand.name}</p>
            <p>タイプ：{food_type.name}</p>
            <p>産地：{production_area.name}</p>
            <p>カロリー：{calorie}</p>
            <div>
              <p>内容量と金額一覧</p>
              {amounts.map((amount, index) => (
                <div key={index}>
                  <p>内容量：{amount.amount}kg</p>
                  <p>金額：{amount.price}円</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Contents end */}
    </>
  );
}

import Link from "next/link";

import { Food } from "../../types/foods";

const ItemTab = ({ item }: { item: Food }) => {
  // 楽天検索リンクを設置するための関数、keywordを元に検索URLを設置
  const RakutenSearchLink = ({ keyword }: { keyword: string }) => {
    // ジャンルを「猫用品」で固定するためにtagIdを付ける
    const tagId = 507524;
    // URIエンコードして楽天市場の検索URLを生成
    const rakutenSearchURL = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
      keyword
    )}/${tagId}/`;

    return (
      // ※target="_blank"には念のためrel="noopener noreferrer"を付ける※
      <Link
        className="ml-4 rounded-md border border-gray-700 bg-red-500 p-1 text-xs font-normal text-white"
        href={rakutenSearchURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        楽天市場で検索
      </Link>
    );
  };

  return (
    <>
      {/* Tab start */}
      <div className="border-b border-gray-200 ">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="active -white -mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white    hs-tab-active:text-blue-600  "
            id={`card-type-tab-item-1-${item.id}`}
            data-hs-tab={`#card-type-tab-1-${item.id}`}
            aria-controls={`card-type-tab-1-${item.id}`}
            role="tab"
          >
            成分
          </button>
          <button
            type="button"
            className="-white -mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white    hs-tab-active:text-blue-600   "
            id={`card-type-tab-item-2-${item.id}`}
            data-hs-tab={`#card-type-tab-2-${item.id}`}
            aria-controls={`card-type-tab-2-${item.id}`}
            role="tab"
          >
            原材料
          </button>
          <button
            type="button"
            className="-white -mb-px inline-flex items-center gap-2 rounded-t-lg border bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-700 hs-tab-active:border-b-transparent hs-tab-active:bg-white    hs-tab-active:text-blue-600   "
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
          <div className="text-gray-500 ">
            {item.nutrient_contents
              // 期待通りの並びになるようにid順にソート
              .sort((a, b) => a.nutrient.id - b.nutrient.id)
              .map((nutrient_content, index) => (
                <div key={index}>
                  {nutrient_content.nutrient.name}：
                  {nutrient_content.content.toFixed(1)} %
                </div>
              ))}
            <p>カロリー：{item.calorie} kcal/100g</p>
          </div>
        </div>
        <div
          id={`card-type-tab-2-${item.id}`}
          className="hidden"
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-2-${item.id}`}
        >
          <div className="text-gray-500 ">{item.ingredients}</div>
        </div>
        <div
          id={`card-type-tab-3-${item.id}`}
          className="hidden"
          role="tabpanel"
          aria-labelledby={`card-type-tab-item-3-${item.id}`}
        >
          <div className="text-gray-500 ">
            <p>タイプ：{item.food_type.name}</p>
            <p>ブランド：{item.brand.name}</p>
            <p>産地：{item.production_area.name}</p>
            <p>ステージ：{item.target_age}</p>
            <div>
              {/* 内容量は1kg未満の場合はg表記で小さい順からソートする */}
              <p>
                内容量：
                {item.amounts
                  .sort((a, b) => a.amount - b.amount)
                  .map((amount) => {
                    if (amount.amount < 1) {
                      return amount.amount * 1000 + "g";
                    }
                    return amount.amount + "kg";
                  })
                  .join("、")}
              </p>
            </div>

            <div className="flex items-center">
              <p>楽天市場平均価格：{item.median_price} 円</p>
              {/* rakuten_name(楽天市場検索用に修正したname)をkeywordに検索窓設置 */}
              <RakutenSearchLink keyword={item.rakuten_name} />
            </div>
          </div>
        </div>
      </div>
      {/* Contents end */}
    </>
  );
};

export default ItemTab;

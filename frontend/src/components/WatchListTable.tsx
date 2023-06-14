import Image from "next/image";
import Link from "next/link";

import { FoodData } from "../types/foods";
import WatchListButton from "./WatchListButton";

interface WatchListTableProps {
  foodData: FoodData;
  handleWatchList: (id: number, isWatched: boolean) => void;
}

const WatchListTable = ({ foodData, handleWatchList }: WatchListTableProps) => {
  return (
    <div className="mx-auto flex flex-col">
      <div className="-m-1.5 overflow-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    イメージ
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="w-40 whitespace-normal border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    フード名
                  </th>
                  <th
                    colSpan={5}
                    scope="col"
                    className="whitespace-nowrap px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    成分量 (%)
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    第1主原料
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    カロリー
                    <br />
                    (kcal/100g)
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    金額
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    ブランド
                  </th>
                  <th
                    rowSpan={2}
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    産地
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    タンパク質
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    脂質
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    粗繊維
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    灰分
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap border px-4 py-1 text-center text-lg font-medium text-gray-500"
                  >
                    水分量
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {foodData.map((food) => (
                  <tr
                    key={food.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                      <Link href="/products/[id]" as={`/products/${food.id}`}>
                        <Image
                          src={food.image_urls[0]}
                          alt={food.name}
                          width={50}
                          height={50}
                          unoptimized //※※本番環境では使用しない※※
                        />
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200">
                      {food.name}
                    </td>
                    {food.nutrient_contents
                      // 期待通りの並びになるようにid順にソート
                      .sort((a, b) => a.nutrient.id - b.nutrient.id)
                      .map((nutrient_content) => (
                        <td
                          key={nutrient_content.nutrient.id}
                          className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200"
                        >
                          {nutrient_content.content}
                        </td>
                      ))}
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200">
                      {food.ingredients.split("、", 1)[0]}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200">
                      {food.calorie}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200">
                      金額
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200">
                      {food.brand.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-lg text-gray-800 dark:text-gray-200">
                      {food.production_area.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-lg font-medium">
                      <WatchListButton
                        id={food.id}
                        handleWatchList={handleWatchList}
                        trueWatchButtonName="リストから削除"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchListTable;

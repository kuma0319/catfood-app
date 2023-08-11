//範囲検索用のコンポーネント
import { ChangeEvent } from "react";

interface rangeOption {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  max_name: string;
  min_name: string;
  range: number[];
  unit: string;
}

const RangeOption = ({
  handleChange,
  label,
  max_name,
  min_name,
  range,
  unit,
}: rangeOption) => {
  return (
    <div className="my-3">
      <label htmlFor={label} className="mb-2 block font-medium dark:text-white">
        {label}
      </label>
      <div className="my-3 flex items-center">
        <div className="flex items-center">
          <select
            id={label}
            className="block h-10 w-24 rounded-md border-gray-200 px-4 py-3 pr-9 text-xs focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            onChange={handleChange}
            name={min_name}
          >
            <option defaultValue={""} value={""}>
              未選択
            </option>
            {/* constant.tsで定義した数値範囲ごとにoptionを生成 */}
            {range.map((value, index) => (
              <option key={index} value={value}>
                {value} {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="mx-2">～</div>
        <div>
          <select
            id={label}
            className="block h-10 w-24 rounded-md border-gray-200 px-4 py-3 pr-9 text-xs focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
            onChange={handleChange}
            name={max_name}
          >
            <option defaultValue={""} value={""}>
              未選択
            </option>
            {/* constant.tsで定義した数値範囲ごとにoptionを生成 */}
            {range.map((value, index) => (
              <option key={index} value={value}>
                {value} {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RangeOption;

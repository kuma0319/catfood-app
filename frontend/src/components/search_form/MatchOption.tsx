//一致検索用のコンポーネント
import { ChangeEvent } from "react";

interface matchOption {
  name: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { id: number; name: string }[];
}

const MatchOption = ({ name, handleChange, label, options }: matchOption) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium dark:text-white">
        {label}
      </label>
      <select
        id="hs-select-label"
        className="block w-28 rounded-md border-gray-200 px-4 py-3 pr-9 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
        onChange={handleChange}
        name={name}
      >
        <option defaultValue={""}>未選択</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MatchOption;

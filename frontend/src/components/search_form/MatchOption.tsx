//一致検索用のコンポーネント
import { ChangeEvent } from "react";

interface matchOption {
  name: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  items: { id: number; name: string }[];
  label: string;
}

const MatchOption = ({ name, handleChange, items, label }: matchOption) => {
  return (
    <div>
      <label htmlFor={label} className="mb-2 block text-sm font-medium ">
        {label}
      </label>
      <select
        id={label}
        className="block w-28 rounded-md border-gray-200 px-4 py-3 pr-9 text-sm focus:border-blue-500 focus:ring-blue-500   "
        onChange={handleChange}
        name={name}
      >
        <option defaultValue={""}>未選択</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MatchOption;

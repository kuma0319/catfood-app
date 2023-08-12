import { ChangeEvent } from "react";

interface KeyWords {
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  value: string;
}

const FoodSearchInput = ({
  name,
  handleChange,
  label,
  placeholder,
  value,
}: KeyWords) => {
  return (
    <div>
      <label htmlFor={name} className=" mb-2 block font-medium dark:text-white">
        {label}
      </label>
      <input
        type="search"
        id={name}
        name={name}
        className="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FoodSearchInput;

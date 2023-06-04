import { ChangeEvent } from "react";

interface matchOption {
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  items: { id: number; name: string }[];
  label: string;
}

const MultipleOption = ({ name, handleChange, items, label }: matchOption) => {
  return (
    <div className="my-3 border-2">
      <label
        htmlFor={label}
        className="my-1 block text-sm font-medium dark:text-white"
      >
        {label}
      </label>
      <div className="gap-x-2 py-2">
        {items.map((item) => {
          return (
            <div key={item.id}>
              {/* nameとvalueでrails側に渡すparamsを管理 */}
              <input
                type="checkbox"
                className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                id={item.name}
                name={name}
                value={item.id}
                onChange={handleChange}
              />
              <label
                htmlFor={item.name}
                className="ml-3 text-sm text-gray-500 dark:text-gray-400"
              >
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleOption;

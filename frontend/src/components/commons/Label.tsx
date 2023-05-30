const Label = () => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium dark:text-white">
        Label
      </label>
      <select
        id="hs-select-label"
        className="block w-40 rounded-md border-gray-200 px-4 py-3 pr-9 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
      >
        <option selected>Open this select menu</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
  );
};

export default Label;

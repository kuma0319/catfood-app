import Image from "next/image";

import FoodSearchInput from "@/components/search_form/FoodSearchInput";
import MultipleOption from "@/components/search_form/MultipleOption";
import RangeOption from "@/components/search_form/RangeOption";
import useFoodSearch from "@/hooks/useFoodSearch";
import {
  FOOD_SEARCH_INPUT_PARAMS,
  SEARCH_AMOUNT_PARAMS,
  SEARCH_BRAND_PARAMS,
  SEARCH_CONTENT_PARAMS,
  SEARCH_PRODUCTION_AREA_PARAMS,
} from "@/search_constant";

const FoodSearch = () => {
  const {
    handleCheckboxChange,
    handleClick,
    handleSelectChange,
    handleWordChange,
    keyWords,
    router,
    searchButtonPressed,
    selectParams,
  } = useFoodSearch();

  return (
    <div className="relative mx-auto max-w-md rounded border border-gray-300 bg-sky-100 p-6">
      <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 md:text-2xl">
        キャットフード一覧
      </h2>
      <Image
        className=" absolute right-2 top-0 sm:right-10 sm:top-1 "
        src="/cat-search.png"
        alt="検索猫"
        width={70}
        height={70}
        unoptimized={true} // これが無いと透過するため
      />
      <div className="hs-accordion-group text-sm">
        <div className="hs-accordion" id="hs-basic-with-arrow-heading-one">
          <button
            className="hs-accordion-toggle group inline-flex w-full items-center gap-x-3 py-3 text-left font-semibold text-gray-800 transition hover:text-gray-500 hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400 dark:hs-accordion-active:text-blue-500"
            aria-controls="hs-basic-with-arrow-collapse-one"
          >
            <svg
              className="block h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              className="hidden h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            ブランドで絞り込む
          </button>
          <div
            id="hs-basic-with-arrow-collapse-one"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-arrow-heading-one"
          >
            <p className="text-gray-800 dark:text-gray-200">
              {SEARCH_BRAND_PARAMS.map((param, index) => (
                <MultipleOption
                  key={index}
                  name={param.name}
                  label={param.label}
                  items={param.items}
                  handleChange={handleCheckboxChange}
                />
              ))}
            </p>
          </div>
        </div>

        <div className="hs-accordion" id="hs-basic-with-arrow-heading-two">
          <button
            className="hs-accordion-toggle group inline-flex w-full items-center gap-x-3 py-3 text-left font-semibold text-gray-800 transition hover:text-gray-500 hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400 dark:hs-accordion-active:text-blue-500"
            aria-controls="hs-basic-with-arrow-collapse-two"
          >
            <svg
              className="block h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              className="hidden h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            原産国で絞り込む
          </button>
          <div
            id="hs-basic-with-arrow-collapse-two"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-arrow-heading-two"
          >
            <p className="text-gray-800 dark:text-gray-200">
              {SEARCH_PRODUCTION_AREA_PARAMS.map((param, index) => (
                <MultipleOption
                  key={index}
                  name={param.name}
                  label={param.label}
                  items={param.items}
                  handleChange={handleCheckboxChange}
                />
              ))}
            </p>
          </div>
        </div>

        <div className="hs-accordion" id="hs-basic-with-arrow-heading-three">
          <button
            className="hs-accordion-toggle group inline-flex w-full items-center gap-x-3 py-3 text-left font-semibold text-gray-800 transition hover:text-gray-500 hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400 dark:hs-accordion-active:text-blue-500"
            aria-controls="hs-basic-with-arrow-collapse-three"
          >
            <svg
              className="block h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              className="hidden h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            成分量、カロリーで絞り込む
          </button>
          <div
            id="hs-basic-with-arrow-collapse-three"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-arrow-heading-three"
          >
            <p className="text-gray-800 dark:text-gray-200">
              {SEARCH_CONTENT_PARAMS.map((param, index) => (
                <RangeOption
                  key={index}
                  min_name={param.min_name}
                  max_name={param.max_name}
                  label={param.label}
                  range={param.range}
                  unit={param.unit}
                  handleChange={handleSelectChange}
                />
              ))}
            </p>
          </div>
        </div>

        <div className="hs-accordion" id="hs-basic-with-arrow-heading-four">
          <button
            className="hs-accordion-toggle group inline-flex w-full items-center gap-x-3 py-3 text-left font-semibold text-gray-800 transition hover:text-gray-500 hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400 dark:hs-accordion-active:text-blue-500"
            aria-controls="hs-basic-with-arrow-collapse-four"
          >
            <svg
              className="block h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              className="hidden h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            内容量、金額で絞り込む
          </button>
          <div
            id="hs-basic-with-arrow-collapse-four"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-arrow-heading-four"
          >
            <p className="text-gray-800 dark:text-gray-200">
              {SEARCH_AMOUNT_PARAMS.map((param, index) => (
                <RangeOption
                  key={index}
                  min_name={param.min_name}
                  max_name={param.max_name}
                  label={param.label}
                  range={param.range}
                  unit={param.unit}
                  handleChange={handleSelectChange}
                />
              ))}
            </p>
          </div>
        </div>

        <div className="hs-accordion" id="hs-basic-with-arrow-heading-five">
          <button
            className="hs-accordion-toggle group inline-flex w-full items-center gap-x-3 py-3 text-left font-semibold text-gray-800 transition hover:text-gray-500 hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400 dark:hs-accordion-active:text-blue-500"
            aria-controls="hs-basic-with-arrow-collapse-five"
          >
            <svg
              className="block h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              className="hidden h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 dark:text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            キーワードで絞り込む
          </button>
          <div
            id="hs-basic-with-arrow-collapse-five"
            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-arrow-heading-five"
          >
            <p className="text-gray-800 dark:text-gray-200">
              {FOOD_SEARCH_INPUT_PARAMS.map((param, index) => (
                <FoodSearchInput
                  key={index}
                  name={param.name}
                  handleChange={handleWordChange}
                  label={param.label}
                  placeholder={param.placeholder}
                  value={keyWords[param.name]}
                />
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className="my-2 text-center">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-blue-500 px-4 py-[.688rem] text-sm font-medium text-white transition-all hover:bg-blue-600 focus:outline-none"
          onClick={handleClick}
        >
          絞り込み検索
        </button>
      </div>
    </div>
  );
};

export default FoodSearch;

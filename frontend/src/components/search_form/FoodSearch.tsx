//indexページがSSG設計の場合の商品検索
import Button from "@/components/search_form/Button";
import FoodSearchInput from "@/components/search_form/FoodSearchInput";
import MultipleOption from "@/components/search_form/MultipleOption";
import RangeOption from "@/components/search_form/RangeOption";
import {
  FOOD_SEARCH_INPUT_PARAMS,
  MULTI_OPTION_PARAMS,
  RANGE_OPTION_PARAMS,
} from "@/constant";
import useFoodSearch from "@/hooks/useFoodSearch";

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
    <div>
      <div>
        {MULTI_OPTION_PARAMS.map((param, index) => (
          <MultipleOption
            key={index}
            name={param.name}
            label={param.label}
            items={param.items}
            handleChange={handleCheckboxChange}
          />
        ))}
      </div>
      {RANGE_OPTION_PARAMS.map((param, index) => (
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
      キーワード検索
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
      <div className="m-8 text-center">
        <Button name="検索" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default FoodSearch;

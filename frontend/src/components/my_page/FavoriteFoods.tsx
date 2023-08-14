import FoodItem from "@/components/products/FoodItem";
import { FoodData } from "@/types/foods";

const FavoriteFoods = ({
  favoriteFoodProps,
}: {
  favoriteFoodProps: FoodData;
}) => {
  return (
    <div className="mb-4 rounded border p-4 shadow-md">
      {favoriteFoodProps.foods_data.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FavoriteFoods;

import { Food } from "@/api/foods";

import ItemTab from "./ItemTab";

interface Props {
  food: Food;
}

export default function FoodItem({ food }: Props) {
  return (
    <>
      <ItemTab
        id={food.id}
        name={food.name}
        amounts={food.amounts}
        brand={food.brand}
        calorie={food.calorie}
        food_type={food.food_type}
        ingredients={food.ingredients}
        nutrient_contents={food.nutrient_contents}
        production_area={food.production_area}
      />
    </>
  );
}

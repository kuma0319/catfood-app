# app/views/api/v1/foods/index.json.jbuilder

json.array! @foods do |food|
  json.extract! food, :id, :name, :calorie, :ingredients
  json.brand do
    json.extract! food.brand, :brand
  end
  json.production_area do
    json.extract! food.production_area, :production_area
  end
  json.food_type do
    json.extract! food.food_type, :food_type
  end
end

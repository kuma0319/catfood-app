# 他のモデルと紐づいていない要素を一括で指定
json.extract! @food, :id, :name, :ingredients, :calorie, :rakuten_name, :rakuten_item_code, :medium_image_url, :min_price, :max_price, :median_price, :add_date

# belongs_toで関連付けられているモデル(brand,production_area,food_type, target_age)の要素を指定
json.brand do
  json.id @food.brand.id
  json.name @food.brand.name
end

json.production_area do
  json.id @food.production_area.id
  json.name @food.production_area.name
end

json.food_type do
  json.id @food.food_type.id
  json.name @food.food_type.name
end

json.target_age do
  json.id @food.target_age.id
  json.name @food.target_age.name
end

# has_manyで関連付けられているnutrient_contentsとamountsを指定
json.nutrient_contents do
  json.array! @food.nutrient_contents do |nutrient_content|
    json.nutrient do
      json.id nutrient_content.nutrient.id
      json.name nutrient_content.nutrient.name
    end
    json.content nutrient_content.content
  end
end

json.amounts do
  json.array! @food.amounts do |amount|
    json.id amount.id
    json.amount amount.amount
  end
end

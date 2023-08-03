require "csv"

CSV.foreach(ENV['NUTRIENTCONTENT_CSV_PATH'], headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  food = Food.find_by(name: row['food_name'])
  nutrient = Nutrient.find_by(name: row['nutrient_name'])

  NutrientContent.create(
    food_id: food.id,
    nutrient_id: nutrient.id,
    content: row['content']
  )
end
require "csv"

CSV.foreach(ENV['NUTRIENTCONTENT_CSV_PATH'], headers: true) do |row|
  NutrientContent.create(
    # id: row[0],
    food_id: row[1],
    nutrient_id: row[2],
    content: row[3]
  )
end
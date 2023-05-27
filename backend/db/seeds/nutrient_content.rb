require "csv"

CSV.foreach("db/seeds/csv/nutrient_content_sample.csv", headers: true) do |row|
  NutrientContent.create(
    id: row[0],
    food_id: row[1],
    nutrient_id: row[2],
    content: row[3]
  )
end
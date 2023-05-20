require "csv"

CSV.foreach("db/seeds/csv/food_sample.csv", headers: true) do |row|
  Food.create(
    id: row[0],
    name: row[1],
    image: row[2],
    ingredients: row[3],
    brand_id: row[4],
    production_area_id: row[5],
    food_type_id: row[6],
    calorie: row[7],
  )
end
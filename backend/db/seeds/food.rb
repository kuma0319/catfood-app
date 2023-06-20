require "csv"

CSV.foreach("db/seeds/csv/food.csv", headers: true) do |row|
  Food.create(
    id: row[0],
    name: row[1],
    ingredients: row[2],
    brand_id: row[3],
    production_area_id: row[4],
    food_type_id: row[5],
    calorie: row[6],
    rakuten_name: row[7],
    medium_image_url: row[8],
    min_price: row[9],
  )
end
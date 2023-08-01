require "csv"

CSV.foreach(ENV['FOOD_CSV_PATH'], headers: true) do |row|
  Food.create(
    id: row[0],
    name: row[1],
    ingredients: row[2],
    brand_id: row[3],
    production_area_id: row[4],
    food_type_id: row[5],
    calorie: row[6],
    target_age:row[7],
    rakuten_name: row[8],
    rakuten_item_code: row[9],
    medium_image_url: row[10],
    min_price: row[11],
    max_price: row[12],
    median_price: row[13],
    add_date: row[14],
  )
end
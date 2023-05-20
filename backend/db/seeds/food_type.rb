require "csv"

CSV.foreach("db/seeds/csv/food_type_sample.csv", headers: true) do |row|
  FoodType.create(
    id: row[0],
    food_type: row[1]
  )
end
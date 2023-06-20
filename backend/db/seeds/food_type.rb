require "csv"

CSV.foreach("db/seeds/csv/food_type.csv", headers: true) do |row|
  FoodType.create(
    id: row[0],
    name: row[1]
  )
end
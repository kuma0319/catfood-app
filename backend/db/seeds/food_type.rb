require "csv"

CSV.foreach(ENV['FOODTYPE_CSV_PATH'], headers: true) do |row|
  FoodType.create(
    # id: row[0],
    name: row[1]
  )
end
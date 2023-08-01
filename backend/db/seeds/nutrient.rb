require "csv"

CSV.foreach(ENV['NUTRIENT_CSV_PATH'], headers: true) do |row|
  Nutrient.create(
    # id: row[0],
    name: row[1]
  )
end
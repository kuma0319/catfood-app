require "csv"

CSV.foreach("db/seeds/csv/nutrient.csv", headers: true) do |row|
  Nutrient.create(
    id: row[0],
    name: row[1]
  )
end
require "csv"

CSV.foreach("db/seeds/csv/production_area.csv", headers: true) do |row|
  ProductionArea.create(
    id: row[0],
    name: row[1]
  )
end
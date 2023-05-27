require "csv"

CSV.foreach("db/seeds/csv/brand_sample.csv", headers: true) do |row|
  Brand.create(
    id: row[0],
    name: row[1]
  )
end
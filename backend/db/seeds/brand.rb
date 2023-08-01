require "csv"

CSV.foreach(ENV['BRAND_CSV_PATH'], headers: true) do |row|
  Brand.create(
    # id: row[0],
    name: row[1]
  )
end
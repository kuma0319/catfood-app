require "csv"

CSV.foreach(ENV['PRODUCTIONAREA_CSV_PATH'], headers: true) do |row|
  ProductionArea.create(
    id: row[0],
    name: row[1]
  )
end
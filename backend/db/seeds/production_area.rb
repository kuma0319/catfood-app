require "csv"

CSV.foreach(ENV['PRODUCTIONAREA_CSV_PATH'], headers: true) do |row|
  # csvのnameカラムからcreate
  ProductionArea.create(
    name: row['name']
  )
end
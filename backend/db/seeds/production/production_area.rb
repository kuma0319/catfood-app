require "csv"

csv_data = CSV.parse(ENV['PRODUCTIONAREA_CSV_DATA'], headers: true)
csv_data.each do |row|
  # csvのnameカラムからcreate
  ProductionArea.create(
    name: row['name']
  )
end
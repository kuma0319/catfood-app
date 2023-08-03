require "csv"

csv_data = CSV.parse(ENV['BRAND_CSV_DATA'], headers: true)
csv_data.each do |row|
  # csvのnameカラムからcreate
  Brand.create(
    name: row['name']
  )
end
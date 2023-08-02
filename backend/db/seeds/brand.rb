require "csv"

CSV.foreach(ENV['BRAND_CSV_PATH'], headers: true) do |row|
  # csvのnameカラムからcreate
  Brand.create(
    name: row['name']
  )
end
require "csv"

csv_data = CSV.parse(ENV['FOODTYPE_CSV_DATA'], headers: true)
csv_data.each do |row|
  # csvのnameカラムからcreate
  FoodType.create(
    name: row['name']
  )
end
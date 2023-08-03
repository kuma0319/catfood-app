require "csv"

puts "DEBUG: " + ENV['NUTRIENT_CSV_DATA'].inspect
csv_data = CSV.parse(ENV['NUTRIENT_CSV_DATA'], headers: true)
csv_data.each do |row|
  # csvのnameカラムからcreate
  Nutrient.create(
    name: row['name']
  )
end
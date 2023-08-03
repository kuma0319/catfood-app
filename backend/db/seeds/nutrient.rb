require "csv"

CSV.foreach(ENV['NUTRIENT_CSV_PATH'], headers: true) do |row|
  # csvのnameカラムからcreate
  Nutrient.create(
    name: row['name']
  )
end
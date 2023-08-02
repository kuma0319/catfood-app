require "csv"

CSV.foreach(ENV['FOODTYPE_CSV_PATH'], headers: true) do |row|
  # csvのnameカラムからcreate
  FoodType.create(
    name: row['name']
  )
end
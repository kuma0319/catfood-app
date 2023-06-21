require "csv"

CSV.foreach(ENV['AMOUNT_CSV_PATH'], headers: true) do |row|
  Amount.create(
    id: row[0],
    food_id: row[1],
    amount: row[2]
  )
end
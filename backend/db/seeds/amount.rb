require "csv"

CSV.foreach("db/seeds/csv/amount_sample.csv", headers: true) do |row|
  Amount.create(
    id: row[0],
    food_id: row[1],
    amount: row[2],
    price: row[3]
  )
end
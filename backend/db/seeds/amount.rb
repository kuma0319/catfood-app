require "csv"

CSV.foreach(ENV['AMOUNT_CSV_PATH'], headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  food = Food.find_by(name: row['food_name'])
  Amount.create(
    food_id: food.id,
    amount: row['amount']
  )
end

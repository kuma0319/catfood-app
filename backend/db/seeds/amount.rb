require "csv"

CSV.foreach(ENV['AMOUNT_CSV_PATH'], headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  food = Food.find_by(name: row['food_name'])

  # データが存在しない場合のエラーハンドリング
  unless food
    puts "以下のデータが不明: #{row.inspect}"
    next
  end

  Amount.create(
    food_id: food.id,
    amount: row['amount']
  )
end

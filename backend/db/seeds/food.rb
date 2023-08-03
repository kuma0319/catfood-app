require "csv"

CSV.foreach(ENV['FOOD_CSV_PATH'], headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  brand = Brand.find_by(name: row['brand_name'])
  production_area = ProductionArea.find_by(name: row['production_area_name'])
  food_type = FoodType.find_by(name: row['food_type_name'])

  # データが存在しない場合のエラーハンドリング
  unless brand && production_area && food_type
    puts "以下のデータが不明: #{row.inspect}"
    next
  end

  Food.create(
    name: row['name'],
    ingredients: row['ingredients'],
    brand_id: brand.id,
    production_area_id: production_area.id,
    food_type_id: food_type.id,
    calorie: row['calorie'],
    target_age:row['target_age'],
    rakuten_name: row['rakuten_name'],
    rakuten_item_code: row['rakuten_item_code'],
    medium_image_url: row['medium_image_url'],
    min_price: row['min_price'],
    max_price: row['max_price'],
    median_price: row['median_price'],
    add_date: row['add_date'],
  )
end
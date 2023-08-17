require "csv"
require_relative '../../config/environment'
require 's3_downloader'

bucket_name = Rails.application.credentials.aws.s3['bucket']
object_key = ENV['FOOD_CSV_KEY']
csv_data = S3Downloader.run_download(bucket_name, object_key)

CSV.parse(csv_data, headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  brand = Brand.find_by(name: row['brand_name'])
  production_area = ProductionArea.find_by(name: row['production_area_name'])
  food_type = FoodType.find_by(name: row['food_type_name'])
  target_age = TargetAge.find_by(name: row['target_age_name'])

  # データが存在しない場合のエラーハンドリング
  unless brand && production_area && food_type && target_age
    puts "以下のデータが不明: #{row.inspect}"
    next
  end

  # find_or_initialize_by(一致するレコードが無ければ新規作成、※createじゃないから保存はしない)でnameカラムに一致するレコードを見つける
  food = Food.find_or_initialize_by(name: row['name'])
  # updateで各カラムを更新
  food.update(
    ingredients: row['ingredients'],
    brand_id: brand.id,
    production_area_id: production_area.id,
    food_type_id: food_type.id,
    target_age_id: target_age.id,
    calorie: row['calorie'],
    rakuten_name: row['rakuten_name'],
    rakuten_item_code: row['rakuten_item_code'],
    medium_image_url: row['medium_image_url'],
    min_price: row['min_price'],
    max_price: row['max_price'],
    median_price: row['median_price'],
    add_date: row['add_date'],
  )
end
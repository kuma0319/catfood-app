require "csv"
require_relative '../../config/environment'
require 's3_downloader'

bucket_name = Rails.application.credentials.aws.s3['bucket']
object_key = ENV['NUTRIENTCONTENT_CSV_KEY']
csv_data = S3Downloader.run_download(bucket_name, object_key)

CSV.parse(csv_data, headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  food = Food.find_by(name: row['food_name'])
  nutrient = Nutrient.find_by(name: row['nutrient_name'])

  # データが存在しない場合のエラーハンドリング
  unless food && nutrient
    puts "以下のデータが不明: #{row.inspect}"
    next
  end

  NutrientContent.create(
    food_id: food.id,
    nutrient_id: nutrient.id,
    content: row['content']
  )
end
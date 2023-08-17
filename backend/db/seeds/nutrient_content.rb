require "csv"
require_relative '../../config/environment'
require 's3_downloader'

bucket_name = Rails.application.credentials.aws.s3['bucket']
object_key = ENV['NUTRIENTCONTENT_CSV_KEY']
csv_data = S3Downloader.run_download(bucket_name, object_key)

CSV.parse(csv_data, headers: true) do |row|
  # 関連付け先を各カラムのnameから取得する
  food = Food.find_by(name: row['food_name'])

  # データが存在しない場合のエラーハンドリング
  unless food
    puts "以下のデータが不明: #{row.inspect}"
    next
  end

  # エクセルの名前欄を紐づけるためにnameの配列を作成
  nutrients = Nutrient.all.map(&:name)

  # 各栄養素名のカラムを参照してcontentの内容を作成
  nutrients.each do |nutrient_name|
    nutrient = Nutrient.find_by(name: nutrient_name)

    # データが存在しない場合のエラーハンドリング
    unless nutrient
      puts "以下の栄養データが不明: #{nutrient_name}"
      next
    end

    # find_or_initialize_by(food_id: food.id, nutrient_id: nutrient.id)とすることで、一意なnutrient_idを持たせる
    nutrient_content = NutrientContent.find_or_initialize_by(food_id: food.id, nutrient_id: nutrient.id)
    nutrient_content.update(content: row[nutrient_name])
  end
end
require "csv"
require_relative '../../config/environment'
require 's3_downloader'

bucket_name = Rails.application.credentials.aws.s3['bucket']
object_key = ENV['NUTRIENT_CSV_KEY']
csv_data = S3Downloader.run_download(bucket_name, object_key)

CSV.parse(csv_data, headers: true) do |row|
  # find_or_create_by(一致するレコードが無ければ新規作成、※保存も実行)で新規登録
  Nutrient.find_or_create_by(
    name: row['name']
  )
end
require "csv"
require_relative '../../config/environment'
require 's3_downloader'

bucket_name = Rails.application.credentials.aws.s3['bucket']
object_key = ENV['NUTRIENT_CSV_KEY']
csv_data = S3Downloader.run_download(bucket_name, object_key)

CSV.parse(csv_data, headers: true) do |row|
  # csvのnameカラムからcreate
  Nutrient.create(
    name: row['name']
  )
end
require "csv"
require_relative '../../config/environment'
require 's3_downloader'

bucket_name = Rails.application.credentials.aws.s3['bucket']
object_key = ENV['ANSWER_CSV_KEY']
csv_data = S3Downloader.run_download(bucket_name, object_key)

CSV.parse(csv_data, headers: true) do |row|
  question = Question.find_by(title: row["question_title"])
  user = User.find_by(email: row["user_email"])

  # 見つからなかった場合、次のループに移行
  next unless user
  next unless question

  # find_or_create_by(一致するレコードが無ければ新規作成、※保存も実行)で新規登録
  Answer.find_or_create_by(
    question_id: question.id,
    user_id: user.id,
    content: row["content"],
  )
end
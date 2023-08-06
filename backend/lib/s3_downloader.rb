# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX - License - Identifier: Apache - 2.0

## S3からオブジェクトをダウンロードするモジュール。参照元：https://docs.aws.amazon.com/ja_jp/sdk-for-ruby/v3/developer-guide/s3-example-get-bucket-item.html
module S3Downloader
  require 'aws-sdk-s3'
  
  # Downloads an object from an Amazon Simple Storage Service (Amazon S3) bucket.
  #
  # @param s3_client [Aws::S3::Client] An initialized S3 client.
  # @param bucket_name [String] The name of the bucket containing the object.
  # @param object_key [String] The name of the object to download.
  # @param local_path [String] The path on your local computer to download
  #   the object.
  # @return [Boolean] true if the object was downloaded; otherwise, false.
  # @example
  #   exit 1 unless object_downloaded?(
  #     Aws::S3::Client.new(region: 'us-east-1'),
  #     'doc-example-bucket',
  #     'my-file.txt',
  #     './my-file.txt'
  #   )

  # 下のdownloadメソッドで使用
  def self.object_download(s3_client, bucket_name, object_key)
    response = s3_client.get_object(bucket: bucket_name, key: object_key)
    response.body.read
  # エラーの場合はメッセージを表示しnilを返す
  rescue StandardError => e
    puts "Error getting object: #{e.message}"
    nil
  end

  # 引数にはS3バケットのバケット名とキー（パス）を渡す
  def self.run_download(bucket_name, object_key)
    # AWSのシークレットキー類をcredentials.ymlから取得して設定(※直接指定しないこと※)
    access_key_id = Rails.application.credentials.aws['access_key_id']
    secret_access_key = Rails.application.credentials.aws['secret_access_key']
    region = Rails.application.credentials.aws.s3['region']
    s3_client = Aws::S3::Client.new(
      access_key_id: access_key_id,
      secret_access_key: secret_access_key,
      region: region
    )

    # 設定したs3_clientを元にdownload処理を実行し、csv_dataに格納
    csv_data = object_download(s3_client, bucket_name, object_key)
    if csv_data
      puts "Object '#{object_key}' in bucket '#{bucket_name}' downloaded."
    else
      puts "Object '#{object_key}' in bucket '#{bucket_name}' not downloaded."
    end
    # csv_dateを返す
    csv_data
  end
end

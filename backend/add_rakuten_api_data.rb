require 'rakuten_web_service'
require 'csv'
require 'dotenv'

# 環境変数を読み込む
Dotenv.load

RakutenWebService.configure do |c|
  # 楽天API用のアプリケーションID
  c.application_id = ENV['RAKUTEN_API_KEY']
end

fetch_time = Time.now

base_csv = 'cat_food_csv/230617_ユニチャーム.csv'

CSV.open("#{base_csv}_add", 'w') do |add_csv|
  CSV.foreach(base_csv, headers: true) do |row|
    items = RakutenWebService::Ichiba::Item.search(
      keyword: row[0], # csvの商品名のカラムをキーワードとして楽天市場で商品を検索
      genreId: '565724', # 「キャットフード」というジャンルで固定
      tagId: 1008045 # 「ドライフード」というタグ指定
    )
    # ヒットした最初の商品からデータを引っ張ってくる
    first_item = items.first

    # 必要な追加情報だけ取得
    row[9] = first_item['itemCode']
    row[10] = first_item['itemUrl']
    row[11] = first_item['mediumImageUrls']
    row[12] = first_item['itemPrice']
    row[13] = first_item['tagIds']
    add_csv << row

    # 楽天APIの要件（1リクエスト1秒以上の間隔）を満たすためにsleep
    sleep(2)
  end
end

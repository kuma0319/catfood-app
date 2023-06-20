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

base_csv = ENV['RAKUTEN_FOOD_LIST_CSV']

CSV.open("#{base_csv}_add.csv", 'w') do |add_csv|
  CSV.foreach("#{base_csv}.csv", headers: true) do |row|
    begin
      items = RakutenWebService::Ichiba::Item.search(
        keyword: row[0], # csvの商品名のカラムをキーワードとして楽天市場で商品を検索
        genreId: '507524', # 「猫用品」というジャンルで固定
      )
      # ヒットした最初の商品からデータを引っ張ってくる
      first_item = items.first

      if first_item.nil?
        # 商品が見つからなかった場合の処理
        row[1] = "Not Found"
        row[2] = "Not Found"
        row[3] = "Not Found"
        row[4] = "Not Found"
        row[5] = "Not Found"
        row[6] = "Not Found"
      else
        # 必要な追加情報だけ取得
        row[1] = items.count
        row[2] = first_item['itemCode']
        row[3] = first_item['itemUrl']
        row[4] = first_item['mediumImageUrls']
        row[5] = first_item['itemPrice']
        row[6] = first_item['tagIds']
      end
      add_csv << row

    rescue => e
      # その他のエラーが発生した場合の処理
      puts "エラー: #{e.message}"
    end

    # 楽天APIの要件（1リクエスト1秒以上の間隔）を満たすためにsleep
    sleep(2)
  end
end


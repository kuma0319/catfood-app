require 'rakuten_web_service'
require 'csv'
require 'dotenv'

# 環境変数を読み込む
Dotenv.load

RakutenWebService.configure do |c|
  # 楽天API用のアプリケーションID
  c.application_id = ENV.fetch('RAKUTEN_API_KEY', nil)
end

fetch_time = Time.now

base_csv = ENV.fetch('RAKUTEN_FOOD_LIST_CSV', nil)

CSV.open("#{base_csv}_add.csv", 'w') do |add_csv|
  CSV.foreach("#{base_csv}.csv", headers: true) do |row|
    begin
      items = RakutenWebService::Ichiba::Item.search(
        keyword: row[0], # csvの商品名のカラムをキーワードとして楽天市場で商品を検索
        genreId: '507524' # 「猫用品」というジャンルで固定
      )
      # ヒットした商品の中で、reviewCount(レビュー件数)が最も多いもののデータを取得
      popular_item = items.sort_by { |item| item["reviewCount"] }.last

      prices = items.map { |item| item["itemPrice"] }

      # 商品価格の中央値を算出するメソッド
      def median_price(prices)
        sorted_prices = prices.sort
        midpoint = sorted_prices.length / 2

        if sorted_prices.length.even?
          sorted_prices[midpoint - 1, 2].sum / 2
        else
          sorted_prices[midpoint]
        end
      end

      if popular_item.nil?
        # 商品が見つからなかった場合の処理
        row[1] = "Not Found"
        row[2] = "Not Found"
        row[3] = "Not Found"
        row[4] = "Not Found"
        row[5] = "Not Found"
        row[6] = "Not Found"
        row[7] = "Not Found"
        row[8] = "Not Found"
        row[9] = "Not Found"
        row[10] = "Not Found"
        row[11] = "Not Found"
        row[12] = fetch_time
      else
        # 必要な追加情報だけ取得
        row[1] = items.count # 検索結果の商品数
        row[2] = popular_item['itemCode'] # 商品コード
        row[3] = popular_item['itemUrl'] # 商品URL
        row[4] = popular_item['mediumImageUrls'] # 商品内画像
        row[5] = popular_item['itemPrice'] # 商品価格
        row[6] = popular_item['tagIds'] # 商品タグID
        row[7] = popular_item['reviewCount'] # レビュー件数
        row[8] = popular_item['reviewAverage'] # レビュー評価
        row[9] = items.sort_by { |item| item["itemPrice"] }.first["itemPrice"] # 全商品の中から最安値の価格
        row[10] = items.sort_by { |item| item["itemPrice"] }.last["itemPrice"] # 全商品の中から最高値の価格
        row[11] = median_price(prices) # 商品価格の中央値
        row[12] = fetch_time # APIデータの取得時間
      end
      add_csv << row
    rescue StandardError => e
      # その他のエラーが発生した場合の処理
      puts "エラー: #{e.message}"
    end

    # 楽天APIの要件（1リクエスト1秒以上の間隔）を満たすためにsleep
    sleep(2)
  end
end

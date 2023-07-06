require 'rakuten_web_service'
require 'csv'
require 'dotenv'

# 環境変数を読み込む
Dotenv.load

RakutenWebService.configure do |c|
  # 楽天API用のアプリケーションID
  c.application_id = ENV.fetch('RAKUTEN_API_KEY', nil)
end

fetch_time = Time.zone.now

CSV.open("cat_food.csv", "ab") do |csv|
  csv << [
    "name",
    "catchcopy",
    "captions",
    "price",
    "image_urls",
    "item_url",
    "genreId",
    "tagIds",
    "item_code",
    "fetch_time"
  ]

  # 1円~15000円の価格範囲で100円ずつ刻む
  (1..15_000).step(100) do |price|
    min_price = price
    max_price = [price + 99, 15_000].min

    page = 1

    loop do
      items = RakutenWebService::Ichiba::Item.search(
        genreId: '565724', # 「キャットフード」というジャンルで固定
        tagId: 1_008_045, # 「ドライフード」というタグ指定
        hits: 30,
        page:,
        minPrice: min_price,
        maxPrice: max_price
      )

      items.each do |item|
        name = item['itemName']
        catchcopy = item['catchcopy']
        captions = item['itemCaption']
        price = item['itemPrice']
        image_urls = item['mediumImageUrls']
        item_url = item['itemUrl']
        genreId = item['genreId']
        tagIds = item['tagIds']
        item_code = item['itemCode']

        csv << [
          name,
          catchcopy,
          captions,
          price,
          image_urls,
          item_url,
          genreId,
          tagIds,
          item_code,
          fetch_time
        ]
      end

      # hitsが30未満になると最終ページであるためそれをbreakポイントとする
      break if items.count < 30

      # ループ継続する度にpage数カウントを1つ増やす
      page += 1

      # 楽天APIの要件（1リクエスト1秒以上の間隔）を満たすためにsleep
      sleep(5)
    end
  end
end

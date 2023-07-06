RakutenWebService.configure do |c|
  # 楽天API用のアプリケーションID
  c.application_id = ENV.fetch('RAKUTEN_API_KEY', nil)
end

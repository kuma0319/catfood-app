# seedをモデル名を指定して実行可能にするrakeファイル
Rails.root.glob('db/seeds/*.rb').each do |file|
  desc "Load the seed data from db/seeds/#{File.basename(file)}"
  task "db:seed:#{File.basename(file).gsub(/\..+$/, '')}" => :environment do
    load(file)
  end
end

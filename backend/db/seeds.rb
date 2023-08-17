# db/seeds配下の各モデルに対するseedファイルを読み込み
# 上から順に実行されため、関連付けが正しくなるように読み込む

# 環境変数で各seedsデータを挿入するかどうか変更
if ENV['SEEDS_NUTRIENT'] == 'true'
  require "./db/seeds/nutrient.rb"
end
if ENV['SEEDS_BRAND'] == 'true'
  require "./db/seeds/brand.rb"
end
if ENV['SEEDS_PRODUCTION_AREA'] == 'true'
  require "./db/seeds/production_area.rb"
end
if ENV['SEEDS_FOOD_TYPE'] == 'true'
  require "./db/seeds/food_type.rb"
end
if ENV['SEEDS_TARGET_AGE'] == 'true'
  require "./db/seeds/target_age.rb"
end
if ENV['SEEDS_FOOD'] == 'true'
  require "./db/seeds/food.rb"
end
if ENV['SEEDS_AMOUNT'] == 'true'
  require "./db/seeds/amount.rb"
end
if ENV['SEEDS_NUTRIENT_CONTENT'] == 'true'
  require "./db/seeds/nutrient_content.rb"
end

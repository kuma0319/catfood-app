# db/seeds配下の各モデルに対するseedファイルを読み込み
# 上から順に実行されため、関連付けが正しくなるように読み込む

# 開発環境と本番環境で変更
if Rails.env.development?
  require "./db/seeds/development/nutrient.rb"
  require "./db/seeds/development/brand.rb"
  require "./db/seeds/development/production_area.rb"
  require "./db/seeds/development/food_type.rb"
  require "./db/seeds/development/food.rb"
  require "./db/seeds/development/amount.rb"
  require "./db/seeds/development/nutrient_content.rb"
elsif ails.env.production?
  require "./db/seeds/production/nutrient.rb"
  require "./db/seeds/production/brand.rb"
  require "./db/seeds/production/production_area.rb"
  require "./db/seeds/production/food_type.rb"
  require "./db/seeds/production/food.rb"
  require "./db/seeds/production/amount.rb"
  require "./db/seeds/production/nutrient_content.rb"
end

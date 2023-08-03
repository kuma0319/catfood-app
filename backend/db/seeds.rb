# db/seeds配下の各モデルに対するseedファイルを読み込み
# 上から順に実行されため、関連付けが正しくなるように読み込む

## ※本番環境用のseed方法は要再考※
require "./db/seeds/nutrient.rb"
require "./db/seeds/brand.rb"
require "./db/seeds/production_area.rb"
require "./db/seeds/food_type.rb"
require "./db/seeds/food.rb"
require "./db/seeds/amount.rb"
require "./db/seeds/nutrient_content.rb"


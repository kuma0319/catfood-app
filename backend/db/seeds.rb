# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#db/seeds配下の各モデルに対するseedファイルを読み込み
require "./db/seeds/nutrient.rb"
require "./db/seeds/brand.rb"
require "./db/seeds/production_area.rb"
require "./db/seeds/food_type.rb"
require "./db/seeds/food.rb"
require "./db/seeds/amount.rb"
require "./db/seeds/nutrient_content.rb"
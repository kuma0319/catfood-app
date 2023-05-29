# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# db/seeds配下の各モデルに対するseedファイルを読み込み
require "./db/seeds/nutrient.rb"
require "./db/seeds/brand.rb"
require "./db/seeds/production_area.rb"
require "./db/seeds/food_type.rb"
require "./db/seeds/food.rb"
require "./db/seeds/amount.rb"
require "./db/seeds/nutrient_content.rb"

# 各サンプルに用意した画像をattach
(1..15).each do |i|
  food = Food.find_by(id: i)

  image_path = Rails.root.join("app/assets/images/#{i}.jpg")

  if food.present? && File.exist?(image_path)
    food.images.attach(io: File.open(image_path), filename: "sample#{i}.jpg", content_type: 'image/jpg')
  end
end

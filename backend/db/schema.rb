# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_19_191136) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "amounts", force: :cascade do |t|
    t.integer "amount"
    t.integer "price"
    t.bigint "food_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_amounts_on_food_id"
  end

  create_table "brands", force: :cascade do |t|
    t.string "brand", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brand"], name: "index_brands_on_brand", unique: true
  end

  create_table "food_types", force: :cascade do |t|
    t.string "food_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_type"], name: "index_food_types_on_food_type", unique: true
  end

  create_table "foods", force: :cascade do |t|
    t.string "name", null: false
    t.string "image"
    t.text "ingredients"
    t.bigint "brand_id", null: false
    t.bigint "production_area_id", null: false
    t.bigint "food_type_id", null: false
    t.integer "calorie"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brand_id"], name: "index_foods_on_brand_id"
    t.index ["food_type_id"], name: "index_foods_on_food_type_id"
    t.index ["production_area_id"], name: "index_foods_on_production_area_id"
  end

  create_table "nutrient_contents", force: :cascade do |t|
    t.integer "nutrient_content"
    t.bigint "food_id", null: false
    t.bigint "nutrient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_nutrient_contents_on_food_id"
    t.index ["nutrient_id"], name: "index_nutrient_contents_on_nutrient_id"
  end

  create_table "nutrients", force: :cascade do |t|
    t.string "nutrient", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nutrient"], name: "index_nutrients_on_nutrient", unique: true
  end

  create_table "production_areas", force: :cascade do |t|
    t.string "production_area", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["production_area"], name: "index_production_areas_on_production_area", unique: true
  end

  add_foreign_key "amounts", "foods"
  add_foreign_key "foods", "brands"
  add_foreign_key "foods", "food_types"
  add_foreign_key "foods", "production_areas"
  add_foreign_key "nutrient_contents", "foods"
  add_foreign_key "nutrient_contents", "nutrients"
end

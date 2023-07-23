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

ActiveRecord::Schema[7.0].define(version: 2023_07_23_135727) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "amounts", force: :cascade do |t|
    t.float "amount"
    t.bigint "food_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_amounts_on_food_id"
  end

  create_table "answers", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.bigint "user_id", null: false
    t.bigint "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["user_id", "question_id"], name: "index_answers_on_user_id_and_question_id", unique: true
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "brands", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_brands_on_name", unique: true
  end

  create_table "evaluations", force: :cascade do |t|
    t.bigint "review_id", null: false
    t.bigint "review_item_id", null: false
    t.integer "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["review_id"], name: "index_evaluations_on_review_id"
    t.index ["review_item_id"], name: "index_evaluations_on_review_item_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "food_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_favorites_on_food_id"
    t.index ["user_id", "food_id"], name: "index_favorites_on_user_id_and_food_id", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "food_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_food_types_on_name", unique: true
  end

  create_table "foods", force: :cascade do |t|
    t.string "name", null: false
    t.text "ingredients"
    t.bigint "brand_id", null: false
    t.bigint "production_area_id", null: false
    t.bigint "food_type_id", null: false
    t.integer "calorie"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "rakuten_name"
    t.string "medium_image_url"
    t.integer "min_price"
    t.index ["brand_id"], name: "index_foods_on_brand_id"
    t.index ["food_type_id"], name: "index_foods_on_food_type_id"
    t.index ["name"], name: "index_foods_on_name", unique: true
    t.index ["production_area_id"], name: "index_foods_on_production_area_id"
  end

  create_table "nutrient_contents", force: :cascade do |t|
    t.float "content"
    t.bigint "food_id", null: false
    t.bigint "nutrient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_nutrient_contents_on_food_id"
    t.index ["nutrient_id"], name: "index_nutrient_contents_on_nutrient_id"
  end

  create_table "nutrients", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_nutrients_on_name", unique: true
  end

  create_table "production_areas", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_production_areas_on_name", unique: true
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "review_items", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_review_items_on_name", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "food_id", null: false
    t.string "title"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_reviews_on_food_id"
    t.index ["user_id", "food_id"], name: "index_reviews_on_user_id_and_food_id", unique: true
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "amounts", "foods"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "users"
  add_foreign_key "evaluations", "review_items"
  add_foreign_key "evaluations", "reviews"
  add_foreign_key "favorites", "foods"
  add_foreign_key "favorites", "users"
  add_foreign_key "foods", "brands"
  add_foreign_key "foods", "food_types"
  add_foreign_key "foods", "production_areas"
  add_foreign_key "nutrient_contents", "foods"
  add_foreign_key "nutrient_contents", "nutrients"
  add_foreign_key "questions", "users"
  add_foreign_key "reviews", "foods"
  add_foreign_key "reviews", "users"
end

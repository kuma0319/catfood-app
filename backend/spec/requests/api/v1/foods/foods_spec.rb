require 'rails_helper'

RSpec.describe "Api::V1::Foods::Foods", type: :request do
  let!(:brand1) { create(:brand, name: "foodsコントローラbrand1") }
  let!(:brand2) { create(:brand, name: "foodsコントローラbrand2") }
  let!(:brand3) { create(:brand, name: "foodsコントローラbrand3") }
  # 並び順検証のために、意図的にnameとbrand属性を変更
  let!(:food1) { create(:food, :with_amounts, :with_nutrient_contents, name: "foodsコントローラname1", brand: brand2) }
  let!(:food2) { create(:food, :with_amounts, :with_nutrient_contents, name: "foodsコントローラname2", brand: brand1) }
  let!(:food3) { create(:food, :with_amounts, :with_nutrient_contents, name: "foodsコントローラname3", brand: brand1) }
  let!(:food4) { create(:food, :with_amounts, :with_nutrient_contents, name: "foodsコントローラname5", brand: brand3) }
  let!(:food5) { create(:food, :with_amounts, :with_nutrient_contents, name: "foodsコントローラname4", brand: brand3) }

  # JSONデータの中身を確認するためのkeyの配列
  let(:keys) { ["name", "calorie", "ingredients", "brand", "production_area", "food_type", "nutrient_contents", "amounts"] }

  ## indexアクション
  describe "GET /index" do
    before { get "/api/v1/foods/foods.json" }
    it "ステータスコード200が返ってくること" do
      expect(response).to have_http_status(200)
    end

    it "全てのフード情報が表示され、配列の長さが一致すること" do
      expect(response.parsed_body['foods_data'].length).to eq(5)
    end

    it "期待されるデータが含まれていること" do
      response.parsed_body['foods_data'].each do |food|
        keys.each do |key|
          expect(food).to have_key(key)
        end
      end
    end

    it "表示されたフード情報の並び順がブランド名の昇順+名前の昇順であること" do
      expect(response.parsed_body['foods_data'].first["id"]).to eq(food2.id)
      expect(response.parsed_body['foods_data'].second["id"]).to eq(food3.id)
      expect(response.parsed_body['foods_data'].third["id"]).to eq(food1.id)
      expect(response.parsed_body['foods_data'].fourth["id"]).to eq(food5.id)
      expect(response.parsed_body['foods_data'].last["id"]).to eq(food4.id)
    end
  end

  ## showアクション
  describe "GET /show" do
    context "存在するfoodIdを指定したとき" do
      before { get "/api/v1/foods/foods/#{food1.id}.json" }

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "JSONデータの中身のidが一致していること" do
        expect(response.parsed_body["id"]).to eq(food1.id)
      end

      it "期待されるデータが含まれていること" do
        keys.each do |key|
          expect(response.parsed_body).to have_key(key)
        end
      end
    end

    context "存在しないfoodIdを指定したとき" do
      before { get "/api/v1/foods/foods/0.json" }

      # 例外発生するとテスト失敗するため、config.action_dispatch.show_exceptions = true に設定して例外をハンドルしている
      it "ステータスコード404が返ってくること" do
        expect(response).to have_http_status(404)
      end
    end
  end

  ## searchアクション
  describe "GET /search" do
    # 検索条件のscopeはモデルスペックで検証済みのため、ここではブランド指定についてのみ検証
    context "検索条件(ここではブランド1)を指定したとき" do
      before { get "/api/v1/foods/search.json?brand_id=#{brand1.id}" }
      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "ブランド1に所属するフード情報のみが表示され、配列の長さが一致すること" do
        expect(response.parsed_body['foods_data'].length).to eq(2)
      end

      it "表示されたフード情報の並び順がブランド名の昇順+名前の昇順であること" do
        expect(response.parsed_body['foods_data'].first["id"]).to eq(food2.id)
        expect(response.parsed_body['foods_data'].last["id"]).to eq(food3.id)
      end

      it "期待されるデータが含まれていること" do
        response.parsed_body['foods_data'].each do |food|
          keys.each do |key|
            expect(food).to have_key(key)
          end
        end
      end
    end

    context "検索条件を指定しなかったとき" do
      before { get "/api/v1/foods/search.json" }
      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "全てのフード情報が表示され、配列の長さが一致すること" do
        expect(response.parsed_body['foods_data'].length).to eq(5)
      end

      it "表示されたフード情報の並び順がブランド名の昇順+名前の昇順であること" do
        expect(response.parsed_body['foods_data'].first["id"]).to eq(food2.id)
        expect(response.parsed_body['foods_data'].second["id"]).to eq(food3.id)
        expect(response.parsed_body['foods_data'].third["id"]).to eq(food1.id)
        expect(response.parsed_body['foods_data'].fourth["id"]).to eq(food5.id)
        expect(response.parsed_body['foods_data'].last["id"]).to eq(food4.id)
      end

      it "期待されるデータが含まれていること" do
        response.parsed_body['foods_data'].each do |food|
          keys.each do |key|
            expect(food).to have_key(key)
          end
        end
      end
    end
  end
end

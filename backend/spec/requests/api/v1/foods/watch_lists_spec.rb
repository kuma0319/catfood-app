require 'rails_helper'

RSpec.describe "Api::V1::Foods::WatchLists", type: :request do
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
    context "params[:ids]を指定した時" do
      before { get "/api/v1/foods/watch_lists.json?ids[]=#{food1.id}&ids[]=#{food2.id}&ids[]=#{food3.id}&ids[]=#{food4.id}&ids[]=#{food5.id}" }
      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "指定したidに対応するフード情報のみが表示され、配列の長さが一致すること" do
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
    context "params[:ids]を指定しなかった時" do
      before { get "/api/v1/foods/watch_lists.json" }
      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "フード情報が表示されず、空配列であること" do
        expect(response.parsed_body['foods_data']).to be_empty
      end
    end
  end
end

require 'rails_helper'

RSpec.describe "Api::V1::Favorites", type: :request do
  let(:user) { create(:user) }
  let(:food) { create(:food) }
  let!(:favorite) { create(:favorite, user_id: user.id, food_id: food.id) }

  let(:tokens) { ["uid", "client", "access-token"] }
  let(:keys) { ["name", "calorie", "ingredients", "brand", "production_area", "food_type", "nutrient_contents", "amounts"] }

  # auth_specと同様にサインインメソッドを使用
  before do
    @headers = sign_in(user)
  end

  # 無効なヘッダー情報用
  before do
    @error_headers = {
      'uid' => "error@example.com",
      'client' => "error_client",
      'access-token' => "error_access_token"
    }
  end

  # showアクション
  describe "GET /favorites" do
    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/favorites.json", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "お気に入りの全てのフード情報が表示され、配列の長さが一致すること" do
        expect(response.parsed_body.length).to eq(1)
      end

      it "期待されるデータが含まれていること" do
        response.parsed_body['foods_data'].each do |food|
          keys.each do |key|
            expect(food).to have_key(key)
          end
        end
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/favorites.json"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/favorite_food_ids", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  # show_food_idsアクション
  describe "GET /favorite_food_ids" do
    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/favorite_food_ids", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "配列の長さが一致すること" do
        expect(response.parsed_body.length).to eq(1)
      end

      it "期待するデータが含まれていること" do
        expect(response.parsed_body).to have_key("food_ids")
        expect(response.parsed_body["food_ids"]).to eq([food.id])
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/favorite_food_ids"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/favorite_food_ids", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  # createアクション
  describe "POST /favorites" do
    let(:other_food) { create(:food) }
    context "正しい情報でリクエストしたとき" do
      before do
        post "/api/v1/favorites", params: { favorite: { food_id: other_food.id } }, headers: @headers
      end

      it "ステータスコード201が返ってくること" do
        expect(response).to have_http_status(201)
      end

      it "期待するフードがお気に入り登録されていること" do
        expect(response.parsed_body["favorite"]["user_id"]).to eq(user.id)
        expect(response.parsed_body["favorite"]["food_id"]).to eq(other_food.id)
      end
    end

    context "重複するフードをお気に入り登録しようとした場合" do
      before do
        post "/api/v1/favorites", params: { favorite: { food_id: food.id } }, headers: @headers
      end

      it "ステータスコード422が返ってくること" do
        expect(response).to have_http_status(422)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        post "/api/v1/favorites", params: { favorite: { food_id: other_food.id } }
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        post "/api/v1/favorites", params: { favorite: { food_id: other_food.id } }, headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  # destroyアクション
  describe "DELETE /favorites" do
    context "正しい情報でリクエストしたとき" do
      before do
        delete "/api/v1/favorites", params: { food_id: food.id }, headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待するフードがお気に入りから削除されていること" do
        expect(response.parsed_body["favorite"]["user_id"]).to eq(user.id)
        expect(response.parsed_body["favorite"]["food_id"]).to eq(food.id)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        delete "/api/v1/favorites", params: { food_id: food.id }
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        delete "/api/v1/favorites", params: { food_id: food.id }, headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "他のログイン状態のユーザーがリクエストしたとき" do
      let(:other_user) { create(:user) }
      before do
        headers = sign_in(other_user)
        delete "/api/v1/favorites", params: { food_id: food.id }, headers:
      end

      it "ステータスコード404が返ってくること" do
        expect(response).to have_http_status(404)
      end

      it "返されるエラーメッセージが期待どおりであること" do
        expect(response.parsed_body["error"]).to include("お気に入りが見つかりません")
      end
    end
  end
end

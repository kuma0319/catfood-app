require 'rails_helper'

RSpec.describe "Api::V1::Users::Users", type: :request do
  let(:user) { create(:user) }

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

  let(:keys) { ["id", "email", "nickname", "avatar_url"] }

  ## indexアクション
  describe "GET /index" do

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/users/users", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待されるデータが含まれていること" do
        keys.each do |key|
          expect(response.parsed_body["user"]).to have_key(key)
        end
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/users/users"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/users/users", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end
end

require 'rails_helper'

RSpec.describe "Api::V1::Answers", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:other_user_2) { create(:user) }
  let(:question_1) { create(:question, user: other_user) }
  let(:question_2) { create(:question, user: other_user_2) }

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

  let(:keys) { ["id", "content", "user_id", "question_id", "created_at", "updated_at"] }

  ## indexアクション
  describe "GET /index" do
    let!(:answer_1) { create(:answer, user:, question: question_1, created_at: 1.day.ago) }
    let!(:answer_2) { create(:answer, user:, question: question_2, created_at: 2.days.ago) }
    let!(:answer_3) { create(:answer, user: other_user, question: question_2, created_at: 1.day.after) }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/answers", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "トークン情報に一致するユーザーの回答のみが表示され、配列の長さが一致すること" do
        expect(response.parsed_body["answers"].length).to eq(2)
      end

      it "配列の並び順が投稿日時の降順であること" do
        expect(response.parsed_body["answers"].map { |answer| answer["id"] }).to eq([answer_1.id, answer_2.id])
      end

      it "期待されるデータが含まれていること" do
        response.parsed_body["answers"].each do |answer|
          keys.each do |key|
            expect(answer).to have_key(key)
          end
        end
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/answers"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/answers", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## showアクション
  describe "GET /show" do
    let!(:answer) { create(:answer, user:, question: question_1) }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/answers/#{answer.id}", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待されるデータが含まれていること" do
        keys.each do |key|
          expect(response.parsed_body["answer"]).to have_key(key)
        end
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/answers"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/answers", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## createアクション
  describe "POST /create" do
    context "正しい情報でリクエストしたとき" do
      let(:content) { "テストコンテンツ" }

      before do
        post "/api/v1/answers",
             params:
             {
               answer: {
                 content:,
                 question_id: question_1.id
               }
             }, headers: @headers
      end

      it "ステータスコード201が返ってくること" do
        expect(response).to have_http_status(201)
      end

      it "期待する回答が登録されていること" do
        expect(response.parsed_body["answer"]["user_id"]).to eq(user.id)
        expect(response.parsed_body["answer"]["content"]).to eq(content)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        post "/api/v1/answers"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        post "/api/v1/answers", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## destroyアクション
  describe "DELETE /destroy" do
    let!(:answer) { create(:answer, user:, question: question_1) }

    context "正しい情報でリクエストしたとき" do
      before do
        delete "/api/v1/answers/#{answer.id}", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待する回答が削除されていること" do
        expect(response.parsed_body["answer"]["id"]).to eq(answer.id)
      end
    end

    context "ログイン中の他のユーザーがリクエストしたとき" do
      before do
        @other_headers = sign_in(other_user)
        delete "/api/v1/answers/#{answer.id}", headers: @other_headers
      end

      it "ステータスコード404が返ってくること" do
        expect(response).to have_http_status(404)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        delete "/api/v1/answers/#{answer.id}"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        delete "/api/v1/answers/#{answer.id}", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end
end

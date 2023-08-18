require 'rails_helper'

RSpec.describe "Api::V1::Questions", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }

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

  let(:index_keys) { ["id", "title", "content", "user", "created_at", "updated_at"] }
  let(:index_user_questions_keys) { ["id", "title", "content", "user_id", "created_at", "updated_at"] }
  let(:show_keys) { ["id", "title", "content", "user", "answers", "created_at", "updated_at"] }
  let(:user_keys) { ["id", "nickname", "avatar_url"] }
  let(:answer_keys) { ["id", "content", "user", "created_at", "updated_at"] }

  ## indexアクション
  describe "GET /index" do
    let!(:question_1) { create(:question, user:, created_at: 1.day.ago) }
    let!(:question_2) { create(:question, user:, created_at: 2.days.ago) }
    let!(:question_3) { create(:question, user: other_user, created_at: 1.day.after) }
    let!(:question_4) { create(:question, user: other_user, created_at: 2.days.after) }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/questions.json"
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "全ての質問が表示され、配列の長さが一致すること" do
        expect(response.parsed_body["questions"].length).to eq(4)
      end

      it "配列の並び順が投稿日時の降順であること" do
        expect(response.parsed_body["questions"].map { |question| question["id"] }).to eq([question_4.id, question_3.id, question_1.id, question_2.id])
      end

      it "紐づいているuserデータも含め、期待されるデータが含まれていること" do
        response.parsed_body["questions"].each do |question|
          index_keys.each do |key|
            expect(question).to have_key(key)
          end

          user_keys.each do |key|
            expect(question["user"]).to have_key(key)
          end
        end
      end
    end
  end

  ## index_user_questionsアクション
  describe "GET /index_user_questions" do
    let!(:question_1) { create(:question, user:, created_at: 1.day.ago) }
    let!(:question_2) { create(:question, user:, created_at: 2.days.ago) }
    let!(:question_3) { create(:question, user: other_user, created_at: 1.day.after) }
    let!(:question_4) { create(:question, user: other_user, created_at: 2.days.after) }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/user_questions", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "トークン情報に一致するユーザーの質問のみ表示され、配列の長さが一致すること" do
        expect(response.parsed_body["questions"].length).to eq(2)
      end

      it "配列の並び順が投稿日時の降順であること" do
        expect(response.parsed_body["questions"].map { |question| question["id"] }).to eq([question_1.id, question_2.id])
      end

      it "期待されるデータが含まれていること" do
        response.parsed_body["questions"].each do |question|
          index_user_questions_keys.each do |key|
            expect(question).to have_key(key)
          end
        end
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/user_questions"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/user_questions", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## showアクション
  describe "GET /show" do
    let!(:question) { create(:question, user:) }
    let!(:answer) { create(:answer, user: other_user, question:) }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/questions/#{question.id}.json"
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "紐づいているanswerのデータとuserデータも含め、期待されるデータが含まれていること" do
        show_keys.each do |key|
          expect(response.parsed_body).to have_key(key)
        end

        user_keys.each do |key|
          expect(response.parsed_body["user"]).to have_key(key)
        end

        response.parsed_body["answers"].each do |answer|
          answer_keys.each do |key|
            expect(answer).to have_key(key)
          end
        end
      end
    end
  end

  ## createアクション
  describe "POST /create" do
    context "正しい情報でリクエストしたとき" do
      let(:title) { "テストタイトル" }
      let(:content) { "テストコンテンツ" }

      before do
        post "/api/v1/questions",
             params:
             {
               question: {
                 title:,
                 content:
               }
             }, headers: @headers
      end

      it "ステータスコード201が返ってくること" do
        expect(response).to have_http_status(201)
      end

      it "期待する質問が登録されていること" do
        expect(response.parsed_body["question"]["user_id"]).to eq(user.id)
        expect(response.parsed_body["question"]["title"]).to eq(title)
        expect(response.parsed_body["question"]["content"]).to eq(content)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        post "/api/v1/questions"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        post "/api/v1/questions", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## destroyアクション
  describe "DELETE /destroy" do
    let!(:question) { create(:question, user:) }

    context "正しい情報でリクエストしたとき" do
      before do
        delete "/api/v1/questions/#{question.id}", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待する質問が削除されていること" do
        expect(response.parsed_body["question"]["id"]).to eq(question.id)
      end
    end

    context "ログイン中の他のユーザーがリクエストしたとき" do
      before do
        @other_headers = sign_in(other_user)
        delete "/api/v1/questions/#{question.id}", headers: @other_headers
      end

      it "ステータスコード404が返ってくること" do
        expect(response).to have_http_status(404)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        delete "/api/v1/questions/#{question.id}"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        delete "/api/v1/questions/#{question.id}", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end
end

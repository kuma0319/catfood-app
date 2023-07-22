require 'rails_helper'

RSpec.describe "Api::V1::Reviews", type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:food) { create(:food) }
  let(:other_food) { create(:food) }
  let(:review_item) { create(:review_item) }

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

  ## indexアクション
  describe "GET /index" do
    # 直接createしようとするとevaluationが必須のためバリエーションエラーとなる。一度buildしてからevaluationsを定義してsaveする。
    let(:review_1) { build(:review, user_id: user.id, food_id: food.id) }
    let(:review_2) { build(:review, user_id: other_user.id, food_id: food.id) }
    before do
      review_1.evaluations << build(:evaluation, review_id: review_1.id, review_item_id: review_item.id)
      review_1.save!
      review_2.evaluations << build(:evaluation, review_id: review_2.id, review_item_id: review_item.id)
      review_2.save!
    end

    # JSONデータの中身を確認するためのkeyの配列
    let(:keys) { ["reviews", "average_scores"] }
    let(:review_keys) { ["id", "food_id", "title", "content", "user", "evaluations", "created_at", "updated_at"] }
    let(:user_keys) { ["id", "nickname", "avatar_url"] }
    let(:evaluation_keys) { ["id", "score", "review_item"] }
    let(:average_score_keys) { ["id", "name", "value"] }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/reviews.json", params: { food_id: food.id }
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "bodyに期待されるキーが含まれていること" do
        keys.each do |key|
          expect(response.parsed_body).to have_key(key)
        end
      end

      it "bodyのreviewsに期待されるキーが含まれていること" do
        response.parsed_body["reviews"].each do |review|
          review_keys.each do |key|
            expect(review).to have_key(key)
          end

          user_keys.each do |key|
            expect(review["user"]).to have_key(key)
          end

          review["evaluations"].each do |evaluation|
            evaluation_keys.each do |key|
              expect(evaluation).to have_key(key)
            end
          end
        end
      end

      it "bodyのaverage_scoresに期待されるキーが含まれていること" do
        response.parsed_body["average_scores"].each do |average_score|
          average_score_keys.each do |key|
            expect(average_score).to have_key(key)
          end
        end
      end

      it "reviewsとaverage_scoresの要素の長さが一致すること" do
        expect(response.parsed_body["reviews"].length).to eq(2)
        expect(response.parsed_body["average_scores"].length).to eq(1)
      end
    end

    context "food_idのパラメータが含まれていないとき" do
      before do
        get "/api/v1/reviews.json"
      end

      it "reviewsとaverage_scoresが空配列であること" do
        expect(response.parsed_body["reviews"].length).to eq(0)
        expect(response.parsed_body["average_scores"].length).to eq(0)
      end
    end
  end

  ## index_user_reviewsアクション
  describe "GET /index_user_reviews" do
    let(:review_1) { build(:review, user_id: user.id, food_id: food.id) }
    let(:review_2) { build(:review, user_id: user.id, food_id: other_food.id) }
    before do
      review_1.evaluations << build(:evaluation, review_id: review_1.id, review_item_id: review_item.id)
      review_1.save!
      review_2.evaluations << build(:evaluation, review_id: review_2.id, review_item_id: review_item.id)
      review_2.save!
    end

    # JSONデータの中身を確認するためのkeyの配列
    let(:review_keys) { ["id", "user_id", "food_id", "title", "content", "evaluations", "created_at", "updated_at"] }
    let(:evaluation_keys) { ["id", "score", "review_item"] }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/user_reviews.json", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "bodyに期待されるキーが含まれていること" do
        response.parsed_body.each do |review|
          review_keys.each do |key|
            expect(review).to have_key(key)
          end

          review["evaluations"].each do |evaluation|
            evaluation_keys.each do |key|
              expect(evaluation).to have_key(key)
            end
          end
        end
      end

      it "要素の長さが一致すること" do
        expect(response.parsed_body.length).to eq(2)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/user_reviews.json"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/user_reviews.json", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## showアクション
  describe "GET /show" do
    let(:review) { build(:review, user_id: user.id, food_id: food.id) }
    before do
      review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
      review.save!
    end

    # JSONデータの中身を確認するためのkeyの配列
    let(:review_keys) { ["id", "user_id", "food_id", "title", "content", "evaluations", "created_at", "updated_at"] }
    let(:evaluation_keys) { ["id", "score", "review_item"] }

    context "正しい情報でリクエストしたとき" do
      before do
        get "/api/v1/reviews/#{review.id}.json", headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "bodyに期待されるキーが含まれていること" do
        review_keys.each do |key|
          expect(response.parsed_body).to have_key(key)
        end

        response.parsed_body["evaluations"].each do |evaluation|
          evaluation_keys.each do |key|
            expect(evaluation).to have_key(key)
          end
        end
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        get "/api/v1/reviews/#{review.id}.json"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        get "/api/v1/reviews/#{review.id}.json", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## createアクション
  describe "POST /create" do
    context "正しい情報でリクエストしたとき" do
      let(:title) { "テストタイトル" }
      let(:content) { "テストコンテンツ" }
      let(:score) { 1 }

      before do
        post "/api/v1/reviews",
             params:
             {
               review: {
                 food_id: food.id,
                 title:,
                 content:,
                 evaluations_attributes: [
                   {
                     review_item_id: review_item.id,
                     score:
                   }
                 ]
               }
             }, headers: @headers
      end

      it "ステータスコード201が返ってくること" do
        expect(response).to have_http_status(201)
      end

      it "期待するレビューが登録されていること" do
        expect(response.parsed_body["review"]["user_id"]).to eq(user.id)
        expect(response.parsed_body["review"]["food_id"]).to eq(food.id)
        expect(response.parsed_body["review"]["title"]).to eq(title)
        expect(response.parsed_body["review"]["content"]).to eq(content)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        post "/api/v1/reviews"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        post "/api/v1/reviews", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## updateアクション
  describe "PATCH /update" do
    let(:review) { build(:review, user_id: user.id, food_id: food.id) }
    before do
      review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
      review.save!
    end

    context "正しい情報でリクエストしたとき" do
      before do
        patch "/api/v1/reviews/#{review.id}", params: { review: { title: "タイトル変更" } }, headers: @headers
      end

      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待する値が更新されていること" do
        expect(response.parsed_body["review"]["title"]).to eq("タイトル変更")
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        patch "/api/v1/reviews/#{review.id}"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        patch "/api/v1/reviews/#{review.id}", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end

  ## destroyアクション
  describe "DELETE /destroy" do
    let(:review) { build(:review, user_id: user.id, food_id: food.id) }
    before do
      review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
      review.save!
    end

    context "正しい情報でリクエストしたとき" do
      before do
        delete "/api/v1/reviews/#{review.id}", headers: @headers
      end
      it "ステータスコード200が返ってくること" do
        expect(response).to have_http_status(200)
      end

      it "期待するレビューが削除されていること" do
        expect(response.parsed_body["review"]["id"]).to eq(review.id)
      end
    end

    context "非ログイン状態のユーザーがリクエストしたとき" do
      before do
        delete "/api/v1/reviews/#{review.id}"
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end

    context "誤ったトークン情報でリクエストしたとき" do
      before do
        delete "/api/v1/reviews/#{review.id}", headers: @error_headers
      end

      it "ステータスコード401が返ってくること" do
        expect(response).to have_http_status(401)
      end
    end
  end
end

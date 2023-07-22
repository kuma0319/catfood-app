require 'rails_helper'

RSpec.describe Evaluation, type: :model do
  let(:user) { create(:user) }
  let(:food) { create(:food) }
  let(:review_item) { create(:review_item) }

  # reviewをevaluations無しで作成するとバリデーションエラーとなるためbuildとする
  let(:review) { build(:review, user_id: user.id, food_id: food.id) }

  # アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:review) }
      it { should belong_to(:review_item) }
    end
  end

  # バリデーションテスト
  describe "validations" do
    context "正しい情報で評価を作成したとき" do
      before do
        review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
        review.save!
      end

      it "バリエーションエラーとならないこと" do
        expect(review).to be_valid
      end
    end

    context "scoreが1~5の整数であるとき" do
      valid_scores = [1, 2, 3, 4, 5]

      valid_scores.each do |valid_score|
        it "バリエーションエラーとならないこと" do
          review.evaluations << build(:evaluation, review:, review_item:, score: valid_score)
          expect(review).to be_valid
        end
      end
    end

    context "scoreが1~5の整数以外であるとき" do
      error_scores = [0, 6, -1, 0.1, 1.0]

      error_scores.each do |error_score|
        it "バリエーションエラーとなること" do
          review.evaluations << build(:evaluation, review:, review_item:, score: error_score)
          expect(review).not_to be_valid
        end
      end
    end

    context "scoreが存在しないとき" do
      before do
        review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: nil)
      end

      it "バリエーションエラーとなること" do
        expect(review).not_to be_valid
      end
    end

    context "同一レビューに重複するreview_item_idが存在するとき" do
      before do
        review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
        review.save!
        review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
      end

      it "バリエーションエラーとなること" do
        expect(review).not_to be_valid
      end
    end
  end

  describe "self.average_scores(food_id)" do
    let(:other_user) { create(:user) }
    let(:other_review) { build(:review, user_id: other_user.id, food_id: food.id) }
    let(:reviews_score) { 1 }
    let(:other_reviews_score) { 4 }
    before do
      review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: reviews_score)
      review.save!
      other_review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: other_reviews_score)
      other_review.save!
    end

    context "food_idを引数で受け取ったとき" do
      it "配列の長さが想定したものと一致すること" do
        expect(Evaluation.average_scores(food.id).length).to eq(1)
      end

      it "各評価項目についてid, name, value(スコアの平均値)を含んだオブジェクトの配列を返すこと" do
        expected_array = [
          {
            id: review_item.id,
            name: review_item.name,
            value: (reviews_score + other_reviews_score) / 2.0
          }
        ]
        expect(Evaluation.average_scores(food.id)).to match_array(expected_array)
      end
    end
  end
end

require 'rails_helper'

RSpec.describe Evaluation, type: :model do
  let(:user) { create(:user) }
  let(:food) { create(:food) }
  let(:review_item) { create(:review_item) }
  let(:review) { create(:review, user_id: user.id, food_id: food.id) }

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
      let(:evaluation) { create(:evaluation, review_id: review.id, review_item_id: review_item.id) }

      it "バリエーションエラーとならないこと" do
        expect(review).to be_valid
      end
    end

    context "scoreが1~5の整数ではないとき" do
      let(:evaluation_with_score_0) { build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: 0) }
      let(:evaluation_with_score_1) { build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: 1) }
      let(:evaluation_with_score_5) { build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: 5) }
      let(:evaluation_with_score_6) { build(:evaluation, review_id: review.id, review_item_id: review_item.id, score: 6) }
      let(:evaluation_with_score_float_score) { build(:evaluation, score: 1.0) }

      it "バリエーションエラーとなること" do
        expect(evaluation_with_score_0).not_to be_valid
        expect(evaluation_with_score_1).to be_valid
        expect(evaluation_with_score_5).to be_valid
        expect(evaluation_with_score_6).not_to be_valid
        expect(evaluation_with_score_float_score).not_to be_valid
      end
    end

    context "scoreが存在しないとき" do
      let(:evaluation_without_score) { build(:evaluation, score: nil) }

      it "バリエーションエラーとなること" do
        expect(evaluation_without_score).not_to be_valid
      end
    end

    context "同一レビューに重複するreview_item_idが存在するとき" do
      let!(:evaluation) { create(:evaluation, review_id: review.id, review_item_id: review_item.id) }
      let(:duplicated_evaluation) { build(:evaluation, review_id: review.id, review_item_id: review_item.id) }

      it "バリエーションエラーとなること" do
        expect(duplicated_evaluation).not_to be_valid
      end
    end
  end

  describe "self.average_scores(food_id)" do
    let(:other_user) { create(:user) }
    let(:other_review) { create(:review, user_id: other_user.id, food_id: food.id) }
    let(:review_item_1) { create(:review_item, name: "評価項目1") }
    let(:review_item_2) { create(:review_item, name: "評価項目2") }
    let!(:evaluation_1) { create(:evaluation, review_id: review.id, review_item_id: review_item_1.id, score: 1) }
    let!(:evaluation_2) { create(:evaluation, review_id: review.id, review_item_id: review_item_2.id, score: 4) }
    let!(:evaluation_3) { create(:evaluation, review_id: other_review.id, review_item_id: review_item_1.id, score: 3) }
    let!(:evaluation_4) { create(:evaluation, review_id: other_review.id, review_item_id: review_item_2.id, score: 5) }

    context "food_idを引数で受け取ったとき" do
      it "配列の長さが想定したものと一致すること" do
        expect(Evaluation.average_scores(food.id).length).to eq(2)
      end

      it "各評価項目についてid, name, value(スコアの平均値)を含んだオブジェクトの配列を返すこと" do
        expected_array = [
          {
            id: review_item_1.id,
            name: review_item_1.name,
            value: (evaluation_1.score + evaluation_3.score) / 2.0
          },
          {
            id: review_item_2.id,
            name: review_item_2.name,
            value: (evaluation_2.score + evaluation_4.score) / 2.0
          },
        ]
        expect(Evaluation.average_scores(food.id)).to match_array(expected_array)
      end
    end
  end
end

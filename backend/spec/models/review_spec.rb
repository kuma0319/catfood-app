require 'rails_helper'

RSpec.describe Review, type: :model do
  let(:user) { create(:user) }
  let(:food) { create(:food) }
  let(:review_item) { create(:review_item) }
  let(:review) { build(:review, user_id: user.id, food_id: food.id) }

  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:user) }
      it { should belong_to(:food) }
      it { should have_many(:evaluations) }
      it { should have_many(:review_items).through(:evaluations) }
    end
  end

  describe "validations" do
    before do
      review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
      review.save!
    end

    context "正しい情報でレビューを作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(review).to be_valid
      end
    end

    context "titleが100文字のとき" do
      before do
        review.title = "a" * 100
      end

      it "バリエーションエラーとならないこと" do
        expect(review).to be_valid
      end
    end

    context "titleが100文字を超えるとき" do
      before do
        review.title = "a" * 101
      end

      it "バリエーションエラーとなること" do
        expect(review).not_to be_valid
      end
    end

    context "titleが存在しないとき" do
      before do
        review.title = nil
      end

      it "バリエーションエラーとなること" do
        expect(review).not_to be_valid
      end
    end

    context "contentが10000文字のとき" do
      before do
        review.content = "a" * 10_000
      end

      it "バリエーションエラーとならないこと" do
        expect(review).to be_valid
      end
    end

    context "contentが10000文字を超えるとき" do
      before do
        review.content = "a" * 10_001
      end

      it "バリエーションエラーとなること" do
        expect(review).not_to be_valid
      end
    end

    context "contentが存在しないとき" do
      before do
        review.content = nil
      end

      it "バリエーションエラーとなること" do
        expect(review).not_to be_valid
      end
    end

    context "evaluationが存在しないとき" do
      it "バリエーションエラーとなること" do
        review_without_evaluation = Review.new(user_id: user.id, food_id: food.id, title: "テスト", content: "テスト")
        expect(review_without_evaluation).not_to be_valid
      end
    end

    context "同一ユーザーが1つの商品に複数レビューを投稿しようとしたとき" do
      let(:duplicated_review) { build(:review, user_id: user.id, food_id: food.id) }

      it "バリエーションエラーとなること" do
        duplicated_review.evaluations << build(:evaluation, review_id: duplicated_review.id, review_item_id: review_item.id)
        duplicated_review.save
        expect(duplicated_review).not_to be_valid
      end
    end
  end
end

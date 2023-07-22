# require 'rails_helper'

# RSpec.describe Review, type: :model do
#   let(:user) { create(:user) }
#   let(:food) { create(:food) }
#   let(:review_item) { create(:review_item) }

#   # アソシエーションテスト
#   describe "association" do
#     context "アソシエーションが正しいこと" do
#       it { should belong_to(:user) }
#       it { should belong_to(:food) }
#       it { should have_many(:evaluations) }
#       it { should have_many(:review_items).through(:evaluations) }
#     end
#   end
  
#   # バリデーションテスト
#   describe "validations" do
#     context "正しい情報でレビューを作成したとき" do
#       # evaluationsも一緒に定義しないとバリデーションエラーとなるため下記のようにする
#       let(:review) { build(:review, user_id: user.id, food_id: food.id) }
#       before do
#         review.evaluations << build(:evaluation, review_id: review.id, review_item_id: review_item.id)
#         review.save!
#       end

#       it "バリエーションエラーとならないこと" do
#         expect(review).to be_valid
#       end
#     end

#     context "titleが100文字を超えるとき" do
#       let(:title_with_100words) {"a" * 100}
#       let(:title_over_100words) {"a" * 101}
#       let(:review_with_100words) { build(:review, title: title_with_100words, user_id: user.id, food_id: food.id) }
#       let(:review_over_100words) { build(:review, title: title_over_100words, user_id: user.id, food_id: food.id) }

#       it "バリエーションエラーとなること" do
#         expect(review_with_100words).to be_valid
#         expect(review_over_100words).not_to be_valid
#       end
#     end

#     context "titleが存在しないとき" do
#       let(:review_without_title) { build(:review, title: nil) }

#       it "バリエーションエラーとなること" do
#         expect(review_without_title).not_to be_valid
#       end
#     end

#     context "contentが10000文字を超えるとき" do
#       let(:content_with_10000words) {"a" * 10000}
#       let(:content_over_10000words) {"a" * 10001}
#       let(:review_with_10000words) { build(:review, content: content_with_10000words, user_id: user.id, food_id: food.id) }
#       let(:review_over_10000words) { build(:review, content: content_over_10000words, user_id: user.id, food_id: food.id) }

#       it "バリエーションエラーとなること" do
#         expect(review_with_10000words).to be_valid
#         expect(review_over_10000words).not_to be_valid
#       end
#     end

#     context "contentが存在しないとき" do
#       let(:review_without_content) { build(:review, content: nil) }

#       it "バリエーションエラーとなること" do
#         expect(review_without_content).not_to be_valid
#       end
#     end

#     context "evaluationが存在しないとき" do
#       it "バリエーションエラーとなること" do
#         review_without_evaluation = Review.new(user_id: user.id, food_id: food.id, title: "テスト", content: "テスト")
#         expect(review_without_evaluation).not_to be_valid
#       end
#     end

#     context "同一ユーザーが1つの商品に複数レビューを投稿しようとしたとき" do
#       let!(:review) { create(:review, user_id: user.id, food_id: food.id) }
#       let(:duplicated_review) { build(:review, user_id: user.id, food_id: food.id) }

#       it "バリエーションエラーとなること" do
#         expect(duplicated_review).not_to be_valid
#       end
#     end
#   end
# end

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

    context "titleが10000文字のとき" do
      before do
        review.content = "a" * 10000
      end

      it "バリエーションエラーとならないこと" do
        expect(review).to be_valid
      end
    end

    context "contentが10000文字を超えるとき" do
      before do
        review.content = "a" * 10001
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

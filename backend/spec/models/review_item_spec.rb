require 'rails_helper'

RSpec.describe ReviewItem, type: :model do
  # アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should have_many(:evaluations) }
    end
  end

  # バリデーションテスト
  describe "validations" do
    let!(:review_item) { create(:review_item) }
    context "正しい情報でレビュー項目を作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(review_item).to be_valid
      end
    end

    context "nameが30文字を超えるとき" do
      let(:name_with_30words) { "a" * 30 }
      let(:name_over_30words) { "a" * 31 }
      let(:review_item_with_30words) { build(:review_item, name: name_with_30words) }
      let(:review_item_over_30words) { build(:review_item, name: name_over_30words) }

      it "バリエーションエラーとなること" do
        expect(review_item_with_30words).to be_valid
        expect(review_item_over_30words).not_to be_valid
      end
    end

    context "nameが存在しないとき" do
      let(:review_item_without_name) { build(:review_item, name: nil) }

      it "バリエーションエラーとなること" do
        expect(review_item_without_name).not_to be_valid
      end
    end

    context "重複するnameで作成したとき" do
      let(:review_item_duplicated_name) { build(:review_item, name: review_item.name) }

      it "バリエーションエラーとなること" do
        expect(review_item_duplicated_name).not_to be_valid
      end
    end
  end
end

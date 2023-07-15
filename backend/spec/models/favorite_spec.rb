require 'rails_helper'

RSpec.describe Favorite, type: :model do
  let(:user) { create(:user) }
  let(:food) { create(:food) }

  # アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:user) }
      it { should belong_to(:food) }
    end
  end

  # バリデーションテスト
  describe "validations" do
    let(:favorite) { create(:favorite, user_id: user.id, food_id: food.id) }
    context "正しい情報でユーザーを作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(favorite).to be_valid
      end
    end

    context "user_idが存在しないとき" do
      let(:favorite_without_user) { build(:favorite, food_id: food.id) }

      it "バリエーションエラーとなること" do
        expect(favorite_without_user).not_to be_valid
      end
    end

    context "food_idが存在しないとき" do
      let(:favorite_without_food) { build(:favorite, user_id: user.id) }

      it "バリエーションエラーとなること" do
        expect(favorite_without_food).not_to be_valid
      end
    end

    context "重複するフードをお気に入り登録したとき" do
      before { create(:favorite, user_id: user.id, food_id: food.id) }
      let(:favorite_duplicated_foodId) { build(:favorite, user_id: user.id, food_id: food.id) }

      it "バリエーションエラーとなること" do
        expect(favorite_duplicated_foodId).not_to be_valid
      end
    end
  end
end

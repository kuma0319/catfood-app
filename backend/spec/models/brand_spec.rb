require 'rails_helper'

RSpec.describe Brand, type: :model do
  subject(:brand) { create(:brand) }

  # アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should have_many(:foods) }
    end
  end

  # バリデーションテスト
  describe "validations" do
    context "正しい条件でインスタンスを作成した時" do
      it "バリエーションエラーとならないこと" do
        expect(brand).to be_valid
      end
    end

    context "nameカラムが存在し、一意性制約を満たし、30文字以下であること" do
      it { is_expected.to validate_presence_of :name }
      it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
      it { is_expected.to validate_length_of(:name).is_at_most(30) }
    end
  end
end

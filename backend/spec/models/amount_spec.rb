require 'rails_helper'

RSpec.describe Amount, type: :model do
  let!(:food) { create(:food) }
  subject(:amount) { create(:amount, food:) }

  # アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:food) }
    end
  end

  # バリデーションテスト
  describe "validations" do
    context "正しい条件でインスタンスを作成した時" do
      it "バリエーションエラーとならないこと" do
        expect(amount).to be_valid
      end
    end

    context "amountカラムとpriceカラムが数値であり0以上であること" do
      it { is_expected.to validate_numericality_of(:amount).is_greater_than(0) }
    end
  end
end

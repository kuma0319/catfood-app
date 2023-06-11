require 'rails_helper'

RSpec.describe NutrientContent, type: :model do
  let!(:food) {FactoryBot.create(:food)}
  let!(:nutrient) {FactoryBot.create(:nutrient)}
  subject(:nutrient_content) {FactoryBot.create(:nutrient_content, food: food, nutrient: nutrient)}

  #アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:food) }
      it { should belong_to(:nutrient) }
    end
  end

  #バリデーションテスト
  describe "validations" do
    context "正しい条件でインスタンスを作成した時" do
      it "バリエーションエラーとならないこと" do
        expect(nutrient_content).to be_valid
      end
    end

    context "contentカラムが数値であり0以上であること" do
      it { is_expected.to validate_numericality_of(:content).is_greater_than(0) }
    end
  end
end

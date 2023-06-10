require 'rails_helper'

RSpec.describe Food, type: :model do

  #バリデーションテスト
  describe "validations" do
    let(:food) {FactoryBot.create(:food)}

    context "正しい条件でインスタンスを作成した時" do
      it "有効となること" do
        expect(food).to be_valid
      end
    end
  end
end

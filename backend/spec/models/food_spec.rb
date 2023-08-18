require 'rails_helper'

RSpec.describe Food, type: :model do
  # アソシエーションテスト
  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:brand) }
      it { should belong_to(:production_area) }
      it { should belong_to(:food_type) }
      it { should have_many(:nutrient_contents) }
      it { should have_many(:nutrients).through(:nutrient_contents) }
      it { should have_many(:amounts) }
    end
  end

  # バリデーションテスト
  describe "validations" do
    subject(:food) { create(:food, :with_all_nutrient_contents, :with_amounts) }
    context "正しい条件でインスタンスを作成した時" do
      it "バリエーションエラーとならないこと" do
        expect(food).to be_valid
      end
    end

    context "nameカラムが存在し、一意性制約を満たし、50文字以下であること" do
      it { is_expected.to validate_presence_of :name }
      it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
      it { is_expected.to validate_length_of(:name).is_at_most(100) }
    end

    context "calorieカラムが数値であり0より大きいこと" do
      it { is_expected.to validate_numericality_of(:calorie).is_greater_than(0) }
    end
  end

  # モデルのスコープのテスト
  describe "scope" do
    describe "#by_brand" do
      let!(:brand1) { create(:brand, name: "テストブランド1") }
      let!(:brand2) { create(:brand, name: "テストブランド2") }
      let!(:brand3) { create(:brand, name: "テストブランド3") }
      let!(:food1) { create(:food, brand: brand1) }
      let!(:food2) { create(:food, brand: brand1) }
      let!(:food3) { create(:food, brand: brand2) }
      let!(:food4) { create(:food, brand: brand3) }
      context "ブランドid、もしくはブランドidの配列で指定した時" do
        it "指定のブランドidに対応するブランドを含むフードを返すこと" do
          expect(Food.by_brand(brand1.id)).to match_array([food1, food2])
          expect(Food.by_brand([brand2.id, brand3.id])).to match_array([food3, food4])
        end
      end
    end

    describe "#by_food_type" do
      let!(:food_type1) { create(:food_type, name: "テストフードタイプ1") }
      let!(:food_type2) { create(:food_type, name: "テストフードタイプ2") }
      let!(:food_type3) { create(:food_type, name: "テストフードタイプ3") }
      let!(:food1) { create(:food, food_type: food_type1) }
      let!(:food2) { create(:food, food_type: food_type1) }
      let!(:food3) { create(:food, food_type: food_type2) }
      let!(:food4) { create(:food, food_type: food_type3) }
      context "フードタイプid、もしくはフードタイプidの配列で指定した時" do
        it "指定のフードタイプidに対応するフードタイプを含むフードを返すこと" do
          expect(Food.by_food_type(food_type1.id)).to match_array([food1, food2])
          expect(Food.by_food_type([food_type2.id, food_type3.id])).to match_array([food3, food4])
        end
      end
    end

    describe "#by_production_area" do
      let!(:production_area1) { create(:production_area, name: "テスト産地1") }
      let!(:production_area2) { create(:production_area, name: "テスト産地2") }
      let!(:production_area3) { create(:production_area, name: "テスト産地3") }
      let!(:food1) { create(:food, production_area: production_area1) }
      let!(:food2) { create(:food, production_area: production_area1) }
      let!(:food3) { create(:food, production_area: production_area2) }
      let!(:food4) { create(:food, production_area: production_area3) }
      context "産地id、もしくは産地idの配列で指定した時" do
        it "指定の産地idに対応する産地を含むフードを返すこと" do
          expect(Food.by_production_area(production_area1.id)).to match_array([food1, food2])
          expect(Food.by_production_area([production_area2.id, production_area3.id])).to match_array([food3, food4])
        end
      end
    end

    describe "#by_target_age" do
      let!(:target_age1) { create(:target_age, name: "テスト年齢1") }
      let!(:target_age2) { create(:target_age, name: "テスト年齢2") }
      let!(:target_age3) { create(:target_age, name: "テスト年齢3") }
      let!(:food1) { create(:food, target_age: target_age1) }
      let!(:food2) { create(:food, target_age: target_age1) }
      let!(:food3) { create(:food, target_age: target_age2) }
      let!(:food4) { create(:food, target_age: target_age3) }
      context "年齢id、もしくは年齢idの配列で指定した時" do
        it "指定の年齢idに対応する年齢を含むフードを返すこと" do
          expect(Food.by_target_age(target_age1.id)).to match_array([food1, food2])
          expect(Food.by_target_age([target_age2.id, target_age3.id])).to match_array([food3, food4])
        end
      end
    end

    describe "#by_calorie" do
      let!(:food1) { create(:food, calorie: 200) }
      let!(:food2) { create(:food, calorie: 250) }
      let!(:food3) { create(:food, calorie: 300) }
      context "カロリーの範囲を指定したとき" do
        it "指定のカロリー範囲のフードを返すこと" do
          expect(Food.by_calorie("", 199)).to match_array([])
          expect(Food.by_calorie(200, 249)).to match_array([food1])
          expect(Food.by_calorie(250, 300)).to match_array([food2, food3])
          expect(Food.by_calorie(301, "")).to match_array([])
        end
      end
    end

    describe "#by_amount" do
      let!(:food1) { create(:food) }
      let!(:food2) { create(:food) }
      let!(:food3) { create(:food) }

      let!(:amount1) { create(:amount, amount: 1.0, food: food1) }
      let!(:amount2) { create(:amount, amount: 1.5, food: food2) }
      let!(:amount3) { create(:amount, amount: 2.0, food: food3) }
      context "内容量の範囲を指定したとき" do
        it "指定の内容量範囲のフードを返すこと" do
          expect(Food.by_amount("", 0.9)).to match_array([])
          expect(Food.by_amount(1.0, 1.4)).to match_array([food1])
          expect(Food.by_amount(1.5, 2.0)).to match_array([food2, food3])
          expect(Food.by_amount(2.1, "")).to match_array([])
        end
      end
    end

    describe "#by_price" do
      let!(:food1) { create(:food, min_price: 1000) }
      let!(:food2) { create(:food, min_price: 2000) }
      let!(:food3) { create(:food, min_price: 3000) }

      context "金額の範囲を指定したとき" do
        it "指定の金額範囲のフードを返すこと" do
          expect(Food.by_price("", 999)).to match_array([])
          expect(Food.by_price(1000, 1999)).to match_array([food1])
          expect(Food.by_price(2000, 3000)).to match_array([food2, food3])
          expect(Food.by_price(3001, "")).to match_array([])
        end
      end
    end

    describe "#by_nutrient_content" do
      let!(:food1) { create(:food) }
      let!(:food2) { create(:food) }
      let!(:food3) { create(:food) }

      let!(:protein) { create(:protein, name: "タンパク質") }

      let!(:protein_content1) { create(:protein_content, nutrient: protein, content: 10, food: food1) }
      let!(:protein_content2) { create(:protein_content, nutrient: protein, content: 20, food: food2) }
      let!(:protein_content3) { create(:protein_content, nutrient: protein, content: 30, food: food3) }
      context "成分（ここではタンパク質）の含有量の範囲を指定したとき" do
        it "指定の成分含有量範囲のフードを返すこと" do
          expect(Food.by_nutrient_content(protein.id, "", 9)).to match_array([])
          expect(Food.by_nutrient_content(protein.id, 10, 10.9)).to match_array([food1])
          expect(Food.by_nutrient_content(protein.id, 20, 30)).to match_array([food2, food3])
          expect(Food.by_nutrient_content(protein.id, 30.1, "")).to match_array([])
        end
      end
    end

    describe "#by_food_name" do
      let!(:food1) { create(:food, name: "名前検索") }
      let!(:food2) { create(:food, name: "search food") }
      context "名前のキーワードを文字列、もしくは文字列の配列で指定したとき" do
        it "指定のキーワードを名前に「含む」フードを返すこと" do
          expect(Food.by_food_name("名前検索")).to match_array([food1])
          expect(Food.by_food_name("名前")).to match_array([food1])
          expect(Food.by_food_name("search")).to match_array([food2])
          expect(Food.by_food_name(["search", "food"])).to match_array([food2])
          expect(Food.by_food_name(["search", "名前"])).to match_array([])
        end
      end
    end

    describe "#by_not_food_name" do
      let!(:food1) { create(:food, name: "名前検索") }
      let!(:food2) { create(:food, name: "search food") }
      context "名前のキーワードを文字列、もしくは文字列の配列で指定したとき" do
        it "指定のキーワードを名前に「含まない」フードを返すこと" do
          expect(Food.by_not_food_name("名前検索")).to match_array([food2])
          expect(Food.by_not_food_name("名前")).to match_array([food2])
          expect(Food.by_not_food_name("search")).to match_array([food1])
          expect(Food.by_not_food_name(["search", "food"])).to match_array([food1])
          expect(Food.by_not_food_name(["search", "名前"])).to match_array([])
        end
      end
    end

    describe "#by_ingredients" do
      let!(:food1) { create(:food, ingredients: "チキン、トウモロコシ、香料") }
      let!(:food2) { create(:food, ingredients: "白身魚、小麦、着色料") }
      context "原材料のキーワードを文字列、もしくは文字列の配列で指定したとき" do
        it "指定のキーワードを原材料に「含む」フードを返すこと" do
          expect(Food.by_ingredients("チキン")).to match_array([food1])
          expect(Food.by_ingredients("白身魚")).to match_array([food2])
          expect(Food.by_ingredients(["チキン", "トウモロコシ"])).to match_array([food1])
          expect(Food.by_ingredients(["チキン", "白身魚"])).to match_array([])
        end
      end
    end

    describe "#by_not_ingredients" do
      let!(:food1) { create(:food, ingredients: "チキン、トウモロコシ、香料") }
      let!(:food2) { create(:food, ingredients: "白身魚、小麦、着色料") }
      context "原材料のキーワードを文字列、もしくは文字列の配列で指定したとき" do
        it "指定のキーワードを原材料に「含まない」フードを返すこと" do
          expect(Food.by_not_ingredients("チキン")).to match_array([food2])
          expect(Food.by_not_ingredients("白身魚")).to match_array([food1])
          expect(Food.by_not_ingredients(["チキン", "トウモロコシ"])).to match_array([food2])
          expect(Food.by_not_ingredients(["チキン", "白身魚"])).to match_array([])
        end
      end
    end
  end
end

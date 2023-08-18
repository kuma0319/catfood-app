require 'rails_helper'

RSpec.describe Question, type: :model do
  let(:user) { create(:user) }

  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:user) }
      it { should have_many(:answers) }
    end
  end

  describe "validations" do
    let(:question) { create(:question, user:) }

    context "正しい情報で質問を作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(question).to be_valid
      end
    end

    context "titleが100文字のとき" do
      before do
        question.title = "a" * 100
      end

      it "バリエーションエラーとならないこと" do
        expect(question).to be_valid
      end
    end

    context "titleが100文字を超えるとき" do
      before do
        question.title = "a" * 101
      end

      it "バリエーションエラーとなること" do
        expect(question).not_to be_valid
      end
    end

    context "titleが存在しないとき" do
      before do
        question.title = nil
      end

      it "バリエーションエラーとなること" do
        expect(question).not_to be_valid
      end
    end

    context "contentが10000文字のとき" do
      before do
        question.content = "a" * 10_000
      end

      it "バリエーションエラーとならないこと" do
        expect(question).to be_valid
      end
    end

    context "contentが10000文字を超えるとき" do
      before do
        question.content = "a" * 10_001
      end

      it "バリエーションエラーとなること" do
        expect(question).not_to be_valid
      end
    end

    context "contentが存在しないとき" do
      before do
        question.content = nil
      end

      it "バリエーションエラーとなること" do
        expect(question).not_to be_valid
      end
    end
  end
end

require 'rails_helper'

RSpec.describe Answer, type: :model do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:question) { create(:question, user:) }

  describe "association" do
    context "アソシエーションが正しいこと" do
      it { should belong_to(:user) }
      it { should belong_to(:question) }
    end
  end

  describe "validations" do
    let!(:answer) { create(:answer, user: other_user, question:) }
    context "正しい情報で回答を作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(answer).to be_valid
      end
    end

    context "contentが10000文字のとき" do
      before do
        answer.content = "a" * 10_000
      end

      it "バリエーションエラーとならないこと" do
        expect(answer).to be_valid
      end
    end

    context "contentが10000文字を超えるとき" do
      before do
        answer.content = "a" * 10_001
      end

      it "バリエーションエラーとなること" do
        expect(answer).not_to be_valid
      end
    end

    context "contentが存在しないとき" do
      before do
        answer.content = nil
      end

      it "バリエーションエラーとなること" do
        expect(answer).not_to be_valid
      end
    end

    context "1つの質問に同一のユーザーが回答したとき" do
      let(:duplicated_answer) { build(:answer, user: other_user, question:) }

      it "バリエーションエラーとなること" do
        expect(duplicated_answer).not_to be_valid
      end
    end

    # カスタムバリデーションcannot_answer_own_questionのテスト
    context "自身の質問に自身で回答したとき" do
      let(:answer_own_question) { build(:answer, user:, question:) }

      it "バリエーションエラーとなり、設定したエラーメッセージが表示されること" do
        expect(answer_own_question).not_to be_valid
        expect(answer_own_question.errors[:user_id]).to include("自身の投稿した質問に回答は出来ません。")
      end
    end
  end
end

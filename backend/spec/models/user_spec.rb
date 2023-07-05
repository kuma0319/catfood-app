require 'rails_helper'
include Rails.application.routes.url_helpers

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }

  describe "validations" do
    context "正しい情報でユーザーを作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(user).to be_valid
      end
    end
  end

  describe "#avatar_url" do
    context "アバターが添付されている場合" do
      it "アバターのurlを返すこと" do
        # アバター画像をアタッチ
        file = fixture_file_upload(Rails.root.join('spec', 'fixtures', 'test_avatar.jpg'), 'image/jpeg')
        user.avatar.attach(file)
        expect(user.avatar_url).to eq(url_for(user.avatar))
      end
    end
  
    context "アバターが添付されていない場合" do
      it "nilを返すこと" do
        expect(user.avatar_url).to be_nil
      end
    end
  end
  
end

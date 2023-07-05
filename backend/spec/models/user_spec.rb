require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.create(:user) }

  describe "validations" do
    context "正しい情報でユーザーを作成したとき" do
      it "バリエーションエラーとならないこと" do
        expect(user).to be_valid
      end
    end
  end

  # describe "authentication" do
  #   it "returns a new token on authentication" do
  #     auth_token = user.create_new_auth_token
  #     expect(auth_token.keys).to contain_exactly("access-token", "token-type", "client", "expiry", "uid")
  #   end
  # end
end

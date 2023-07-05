require 'rails_helper'

RSpec.describe 'Api::V1::Auth', type: :request do

  # サインアップ
  describe 'POST /api/v1/auth' do
    let(:email_address) {"test@example.com"}
    let(:confirm_success_url) {"http://localhost:3010"}
    let(:mail_bodies) { ["confirmation_token", "redirect_url"] }

    context '正しい情報でサインアップしたとき' do
      before do
        # サインアップのパラメータとしてconfirm_success_urlを与えておく
        post '/api/v1/auth',params: {registration: {email: email_address, password: "password"}, confirm_success_url: confirm_success_url}, headers: { Accept: "application/json" }
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it '期待された内容のメールが送信されること' do
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        mail = ActionMailer::Base.deliveries.last
        expect(mail.to).to include(email_address)
        expect(mail['redirect-url'].value).to eq(confirm_success_url)
        mail_bodies.each do |mail_body| # ボディにリダイレクトurlと認証トークンが含まれていること
          expect(mail.body).to include(mail_body)
        end
      end
    end

    context '重複したメールアドレスで登録を実行した場合' do
      let!(:user) {create(:user, email: email_address)}
      before do
        post '/api/v1/auth',params: {registration: {email: email_address, password: "password"}, confirm_success_url: confirm_success_url}, headers: { Accept: "application/json" }
      end

      it 'HTTPステータスが422であること' do
        expect(response).to have_http_status(422)
      end

      it '期待する内容のエラー情報が含まれていること' do
        expect(JSON.parse(response.body)['errors']['full_messages']).to include("メールアドレスは既に使用されています。")
      end

      it 'メールが送信されないこと' do
        expect(ActionMailer::Base.deliveries.count).to eq(0)
      end
    end
  end

  # サインイン
  describe 'POST /api/v1/auth/sign_in' do
    let!(:user) {create(:user)}
    let(:tokens) { ["uid", "client", "access-token"] }
    
    context '正しい情報でサインインしたとき' do
      before do
        user.confirm # メールアドレス認証を入れているためこれが必要
        post '/api/v1/auth/sign_in', params: {email: user.email, password: user.password}, headers: { Accept: "application/json" }
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'レスポンスヘッダーにトークン情報があること' do
        tokens.each do |token|
          expect(response.header).to have_key(token)
        end
      end
    end

    context '誤った情報でサインインしたとき' do
      before do
        user.confirm
        post '/api/v1/auth/sign_in', params: {email: user.email, password: 'error_password'}, headers: { Accept: "application/json" }
      end
      
      it 'HTTPステータスが401であること' do
        expect(response).to have_http_status(401)
      end

      it 'エラーが返ってきていること' do
        expect(JSON.parse(response.body)['errors']).to_not be_empty
      end

      it 'レスポンスヘッダーにトークン情報が無いこと' do
        tokens.each do |token|
          expect(response.header).not_to have_key(token)
        end
      end
    end
  end
end
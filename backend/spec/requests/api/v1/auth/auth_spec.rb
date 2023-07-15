require 'rails_helper'

RSpec.describe 'Api::V1::Auth', type: :request do
  let(:user) { create(:user) }
  let(:tokens) { ["uid", "client", "access-token"] }

  before do
    @headers = sign_in(user)
  end

  # 無効なヘッダー情報用
  before do
    @error_headers = {
      'uid' => "error@example.com",
      'client' => "error_client",
      'access-token' => "error_access_token"
    }
  end

  # サインアップ
  describe 'POST /api/v1/auth' do
    let(:email_address) { "test@example.com" }
    let(:confirm_success_url) { "http://localhost:3010" }
    let(:mail_bodies) { ["confirmation_token", "redirect_url"] }

    context '正しい情報でサインアップしたとき' do
      before do
        # サインアップのパラメータとしてconfirm_success_urlを与えておく
        post '/api/v1/auth', params: { registration: { email: email_address, password: "password" }, confirm_success_url: }, headers: { Accept: "application/json" }
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'メールアドレス認証のためのメールが送信されること' do
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
      let!(:user) { create(:user, email: email_address) }
      before do
        post '/api/v1/auth', params: { registration: { email: email_address, password: "password" }, confirm_success_url: }, headers: { Accept: "application/json" }
      end

      it 'HTTPステータスが422であること' do
        expect(response).to have_http_status(422)
      end

      it '期待する内容のエラー情報が含まれていること' do
        expect(response.parsed_body['errors']['full_messages']).to include("メールアドレスは既に使用されています。")
      end

      it 'メールが送信されないこと' do
        expect(ActionMailer::Base.deliveries.count).to eq(0)
      end
    end
  end

  # サインイン
  describe 'POST /api/v1/auth/sign_in' do
    context '正しい情報でサインインしたとき' do
      before do
        @headers = sign_in(user)
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'レスポンスヘッダーにトークン情報があること' do
        tokens.each do |token|
          expect(response.header).to have_key(token)
        end
      end

      it 'トークンが有効化されていること' do
        get '/api/v1/auth/validate_token', headers: @headers
        expect(response).to have_http_status(200)
      end
    end

    context '誤った情報でサインインしたとき' do
      before do
        user.confirm
        post '/api/v1/auth/sign_in', params: { email: user.email, password: 'error_password' }, headers: { Accept: "application/json" }
      end

      it 'HTTPステータスが401であること' do
        expect(response).to have_http_status(401)
      end

      it 'エラーが返ってきていること' do
        expect(response.parsed_body['errors']).to_not be_empty
      end

      it 'レスポンスヘッダーにトークン情報が無いこと' do
        tokens.each do |token|
          expect(response.header).not_to have_key(token)
        end
      end
    end
  end

  # サインアウト
  describe 'DELETE /api/v1/auth/sign_out' do
    before do
      @headers = sign_in(user)
    end

    context '正しい情報でサインアウトしたとき' do
      before do
        delete '/api/v1/auth/sign_out', headers: @headers
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'レスポンスヘッダーにトークン情報が無いこと' do
        tokens.each do |token|
          expect(response.header).not_to have_key(token)
        end
      end

      it 'トークンが無効化されていること' do
        get '/api/v1/auth/validate_token', headers: @headers
        expect(response).to have_http_status(401)
      end
    end

    context '無効なトークン情報でサインアウトしたとき' do
      before do
        delete '/api/v1/auth/sign_out', headers: @error_headers
      end

      it 'HTTPステータスが404であること' do
        expect(response).to have_http_status(404)
      end

      it 'トークンが無効化されていないこと' do
        get '/api/v1/auth/validate_token', headers: @headers
        expect(response).to have_http_status(200)
      end
    end
  end

  # 更新
  describe 'PATCH /api/v1/auth' do
    let(:name) { "テストネーム" }
    let(:nickname) { "テストニックネーム" }
    let(:new_email) { "new_test@example.com" }

    context '許可されているパラメータを更新したとき' do
      before do
        @headers = sign_in(user)
        patch '/api/v1/auth', params: { nickname: }, headers: @headers
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'ユーザーの情報が正しく更新されていること' do
        user.reload
        expect(user.nickname).to eq(nickname)
      end
    end

    context '許可されていないパラメータを更新したとき' do
      before do
        @headers = sign_in(user)
        patch '/api/v1/auth', params: { name: }, headers: @headers
      end

      it 'HTTPステータスが422であること' do
        expect(response).to have_http_status(422)
      end

      it '期待する内容のエラー情報が含まれていること' do
        expect(response.parsed_body['errors']).to include("リクエストボディに適切なアカウント更新のデータを送信してください。")
      end

      it 'ユーザーの情報が更新されていないこと' do
        user.reload
        expect(user.name).to eq(nil)
      end
    end

    context '適切なトークンが含まれないとき' do
      before do
        patch '/api/v1/auth', params: { nickname: }, headers: @error_headers
      end

      it 'HTTPステータスが404であること' do
        expect(response).to have_http_status(404)
      end

      it '期待する内容のエラー情報が含まれていること' do
        expect(response.parsed_body['errors']).to include("ユーザーが見つかりません。")
      end

      it 'ユーザーの情報が更新されていないこと' do
        user.reload
        expect(user.name).to eq(nil)
      end
    end
  end

  # アカウント削除
  describe 'DELETE /api/v1/auth' do
    context '正しい情報でアカウント削除したとき' do
      before do
        @headers = sign_in(user)
        delete '/api/v1/auth', headers: @headers
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'アカウントが存在しないこと' do
        after_delete_user = User.find_by(email: user.email)
        expect(after_delete_user).to eq(nil)
      end
    end

    context '無効なトークン情報でアカウント削除したとき' do
      before do
        delete '/api/v1/auth', headers: @error_headers
      end

      it 'HTTPステータスが404であること' do
        expect(response).to have_http_status(404)
      end

      it 'アカウントが削除されていないこと' do
        after_delete_user = User.find_by(email: user.email)
        expect(after_delete_user).to eq(user)
      end
    end
  end

  # パスワードリセットメールの送信
  describe 'POST /api/v1/auth/password' do
    let(:password_reset_redirect_url) { "http://localhost:3010" }
    let(:mail_bodies) { ["redirect_url", "reset_password_token"] }

    context '正しいメールアドレスでパスワードリセットをリクエストしたとき' do
      before do
        post '/api/v1/auth/password', params: { email: user.email, redirect_url: password_reset_redirect_url }
      end

      it 'HTTPステータスが200であること' do
        expect(response).to have_http_status(200)
      end

      it 'パスワードリセット用のメールが送信されること' do
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        mail = ActionMailer::Base.deliveries.last
        expect(mail.to).to include(user.email)
        expect(mail['redirect-url'].value).to eq(password_reset_redirect_url)
        mail_bodies.each do |mail_body|
          expect(mail.body).to include(mail_body)
        end
      end
    end

    context '無効なメールアドレスでパスワードリセットをリクエストしたとき' do
      let(:error_email_address) { "error@example.com" }
      before do
        post '/api/v1/auth/password', params: { email: error_email_address, redirect_url: password_reset_redirect_url }
      end

      it 'HTTPステータスが404であること' do
        expect(response).to have_http_status(404)
      end

      it '期待する内容のエラー情報が含まれていること' do
        expect(response.parsed_body['errors']).to include("メールアドレス '#{error_email_address}' のユーザーが見つかりません。")
      end
    end
  end
end

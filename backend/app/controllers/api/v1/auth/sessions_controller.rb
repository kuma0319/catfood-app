class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  # ゲストユーザーログイン用メソッド
  def guest_sign_in
    @resource = User.guest # Userクラスメソッドのself.guestでユーザー情報を格納
    @token = @resource.create_token # 認証情報を作成
    @resource.save! # 認証情報を保存
    render_create_success # 認証情報の付与されたユーザー情報を返す(devise_token_authのメソッド)
  end
end

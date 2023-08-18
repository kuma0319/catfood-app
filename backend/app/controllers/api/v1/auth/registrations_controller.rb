class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  # avatarがある場合にActiveStorageでアタッチ
  def update
    super do |resource|
      resource.avatar.attach(params[:avatar]) if params[:avatar]
    end
  end

  private

  # devise_token_authの許可パラメータのオーバーライド
  def sign_up_params
    params.require(:registration).permit(:nickname, :email, :password)
  end

  def account_update_params
    params.permit(:nickname, :email, :avatar)
  end
end

class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  # avatarがある場合にActiveStorageでアタッチ
  def update
    super do |resource|
      resource.avatar.attach(params[:avatar]) if params[:avatar]
    end
  end

  private
  #ユーザー更新時に使用
  def account_update_params
      params.require(:registration).permit(:nickname, :email, :avatar)
  end
end

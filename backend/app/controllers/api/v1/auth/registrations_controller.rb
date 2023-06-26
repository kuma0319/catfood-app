class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private
  #ユーザー更新時に使用
  def account_update_params
      params.require(:registration).permit(:name, :registration, :email, :image, :password)
  end
end

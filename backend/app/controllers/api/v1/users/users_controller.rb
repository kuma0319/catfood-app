class Api::V1::Users::UsersController < ApplicationController
  # devise_token_authのauthenticate_userを使用
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    # devise_token_authのcurrent_userのJSONデータとavatarのurlを返す
    render json: {
      user: current_api_v1_user.as_json(methods: :avatar_url)
    }, status: :ok
  end
end

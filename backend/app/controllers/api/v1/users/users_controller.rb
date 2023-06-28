class Api::V1::Users::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    render json: {
      user: current_api_v1_user
    }, status: :ok
  end
end

class Api::V1::FavoritesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:show, :create, :destroy]

  def show
    # devise_token_authのcurrent_userにおけるidを指定
    favorite = Favorite.where(user_id: current_api_v1_user.id)

    render json: {
      favorite:
    }, status: :ok
  end

  def create
    favorite = Favorite.new(favorite_params)
    favorite.user_id = current_api_v1_user.id
    if favorite.save
      render json: {
        favorite:
      }, status: :created
    else
      render json: {
        errors: favorite.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    # current_api_v1_userのfavoriteのみを削除可能(他者からの削除防止)
    favorite = current_api_v1_user.favorites.find(params[:favorite_id])

    if favorite.destroy
      render json: {
        favorite:
      }, status: :ok
    else
      render json: {
        errors: favorite.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:food_id)
  end
end

class Api::V1::FavoritesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:show, :show_food_ids, :create, :destroy]

  def show
    # devise_token_authのcurrent_userにおけるidを指定
    favorites = Favorite.where(user_id: current_api_v1_user.id)

    # 上記の情報からfood_idの配列にしこれで@foodsを返す
    @foods = Food.includes(:brand, :production_area, :food_type, { nutrient_contents: :nutrient }, :amounts)
      .order("brands.name", "foods.name")
      .where(id: food_ids(favorites))
  end

  # フードidの配列を渡すエンドポイント
  def show_food_ids
    favorites = Favorite.where(user_id: current_api_v1_user.id)

    # 上記の情報からfood_idの配列にしこれを返す
    food_ids = food_ids(favorites)
    render json: {
      food_ids:
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
    # paramsで送られてきたfood_idに対応するfavoriteを削除する
    favorite = current_api_v1_user.favorites.find_by(food_id: params[:food_id])

    # favoriteの存在性確認をおこなうことでお気に入りがなかった場合に404を返す
    if favorite
      if favorite.destroy
        render json: {
          favorite:
        }, status: :ok
      else
        render json: {
          errors: favorite.errors
        }, status: :unprocessable_entity
      end
    else
      render json: { error: "お気に入りが見つかりません" }, status: :not_found
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:food_id)
  end

  def food_ids(favorites)
    favorites.map do |favorite|
      favorite.food_id
    end
  end
end

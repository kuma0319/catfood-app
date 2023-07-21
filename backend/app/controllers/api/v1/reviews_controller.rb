class Api::V1::ReviewsController < ApplicationController
  before_action :set_review, only: [ :update, :destroy]
  before_action :authenticate_api_v1_user!, only: [:user_reviews, :show, :create, :update, :destroy]

  # 特定のキャットフードに紐づけられているレビューを全て返す
  def index
    @reviews = Review.includes(:evaluations, :review_items, :user).where(food_id: params[:food_id])
  end

  # 特定のユーザーに紐づけられているレビューを全て返す
  def index_user_reviews
    @reviews = Review.includes(:evaluations, :review_items, :user).where(user_id: current_api_v1_user.id)
  end

  def show
    @review = current_api_v1_user.reviews.includes(:evaluations, :review_items, :user).find(params[:id])
  end

  def create
    review = Review.new(review_params)
    review.user_id = current_api_v1_user.id
    if review.save
      render json: {
        review:
      }, status: :created
    else
      render json: {
        errors: review.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @review.update(update_params)
      render json: {
        review: @review
      }, status: :ok
    else
      render json: {
        errors: @review.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @review.destroy
      render json: {
        review: @review
      }, status: :ok
    else
      render json: {
        errors: @review.errors
      }, status: :unprocessable_entity
    end
  end

  private

  # current_api_v1_user.reviewsとすることで本人のみのレビューにアクセス権を与える
  def set_review
    @review = current_api_v1_user.reviews.find(params[:id])
  end

  # create時のparameter。モデルでnested_attributesにて関連付けたevaluationsもevaluations_attributesとすることで同時に取り扱う
  def review_params
    params.require(:review).permit(:food_id, :title, :content, evaluations_attributes: [:review_item_id, :score])
  end

  # update時のparameter。モデルでnested_attributesにて関連付けたevaluationsもevaluations_attributesとすることで同時に取り扱う
  def update_params
    params.require(:review).permit(:title, :content, evaluations_attributes: [:id, :score])
  end
end

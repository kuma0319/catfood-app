class Api::V1::ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]
  before_action :authenticate_api_v1_user!, only: [:user_reviews, :show, :create, :update, :destroy]

  # 特定のキャットフードに紐づけられているレビューを全て返す
  def index
    reviews = Review.where(food_id: params[:food_id])

    render json: {
      reviews:
    }, status: :ok
  end

  # 特定のユーザーに紐づけられているレビューを全て返す
  def index_user_reviews
    reviews = Review.where(user_id: current_api_v1_user.id)

    render json: {
      reviews:
    }, status: :ok
  end

  def show
    render json: {
      review: @review
    }, status: :ok
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

  def review_params
    params.require(:review).permit(:food_id, :title, :content)
  end

  def update_params
    params.require(:review).permit(:title, :content)
  end
end

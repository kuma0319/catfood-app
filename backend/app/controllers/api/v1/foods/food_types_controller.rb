class Api::V1::Foods::FoodTypesController < ApplicationController
  before_action :set_food_type, only: [:show, :update, :destroy]

  def index
    food_types = FoodType.all

    render json: {
      food_types:
    }, status: :ok
  end

  def show
    render json: {
      food_type: @food_type
    }, status: :ok
  end

  def create
    food_type = FoodType.new(food_type_params)
    if food_type.save
      render json: {
        food_type:
      }, status: :created
    else
      render json: {
        errors: food_type.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @food_type.update(food_type_params)
      render json: {
        food_type: @food_type
      }, status: :ok
    else
      render json: {
        errors: @food_type.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @food_type.destroy
      render json: {
        food_type: @food_type
      }, status: :ok
    else
      render json: {
        errors: @food_type.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_food_type
    @food_type = FoodType.find(params[:id])
  end

  def food_type_params
    params.require(:food_type).permit(:food_type)
  end
end

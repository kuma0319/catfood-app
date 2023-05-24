class Api::V1::Foods::FoodsController < ApplicationController
  before_action :set_food, only: [:show, :update, :destroy]

  def index
    @foods = Food.includes(:brand, :production_area, :food_type, :nutrients, :nutrient_contents, :amounts).all

    render status: :ok
  end
  

  def create
    food = Food.new(food_params)
    if food.save
      render json: {
        food:
      }, status: :created
    else
      render json: {
        errors: food.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @food.update(food_params)
      render json: {
        food: @food
      }, status: :ok
    else
      render json: {
        errors: @food.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @food.destroy
      render json: {
        food: @food
      }, status: :ok
    else
      render json: {
        errors: @food.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_food
    @food = Food.find(params[:id])
  end

  def food_params
    params.require(:food).permit(:name, :ingredients, :brand_id,
                                 :production_area_id, :food_type_id, :calorie, :images)
  end
end
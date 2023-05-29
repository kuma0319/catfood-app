class Api::V1::Foods::FoodsController < ApplicationController
  before_action :set_food, only: [:update, :destroy]

  def index
    @foods = Food.includes(:brand, :production_area, :food_type, :nutrients, :nutrient_contents, :amounts).all

    render status: :ok
  end

  def show
    @food = Food.includes(:brand, :production_area, :food_type, :nutrients, :nutrient_contents, :amounts).find(params[:id])
    
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

  def search
    @foods = Food.by_brand(params[:brand_id])
    .by_food_type(params[:food_type_id])
    .by_production_area(params[:production_area_id])
    .by_calorie(params[:min_calorie], params[:max_calorie])
    .by_nutrient_content(params[:nutrient_id], params[:min_nutrient_content], params[:max_nutrient_content])
    .by_amount(params[:min_amount], params[:max_amount])
    .by_price(params[:min_price], params[:max_price])

    render status: :ok
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

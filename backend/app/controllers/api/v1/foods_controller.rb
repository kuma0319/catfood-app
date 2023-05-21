class Api::V1::FoodsController < ApplicationController
  before_action :set_food, only: [:show, :edit, :update, :destroy]

  def index
    foods = Food.all

    render json: {
      foods: foods
    }, status: :ok
  end

  def show
    render json: {
      food: @food
    }, status: :ok
  end

  def create
    food = Food.new(params[:food])
    if food.save
      render json: {
        food: food
      }, status: :created
    else
      render json: {
        errors: food.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @food.update(params[:food])
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
end
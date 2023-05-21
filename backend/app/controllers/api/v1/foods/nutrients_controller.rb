class Api::V1::Foods::NutrientsController < ApplicationController
  before_action :set_nutrient, only: [:show, :update, :destroy]

  def index
    nutrients = Nutrient.all

    render json: {
      nutrients:
    }, status: :ok
  end

  def show
    render json: {
      nutrient: @nutrient
    }, status: :ok
  end

  def create
    nutrient = Nutrient.new(nutrient_params)
    if nutrient.save
      render json: {
        nutrient:
      }, status: :created
    else
      render json: {
        errors: nutrient.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @nutrient.update(nutrient_params)
      render json: {
        nutrient: @nutrient
      }, status: :ok
    else
      render json: {
        errors: @nutrient.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @nutrient.destroy
      render json: {
        nutrient: @nutrient
      }, status: :ok
    else
      render json: {
        errors: @nutrient.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_nutrient
    @nutrient = Nutrient.find(params[:id])
  end

  def nutrient_params
    params.require(:nutrient).permit(:nutrient)
  end
end

class Api::V1::Foods::NutrientContentsController < ApplicationController
  before_action :set_nutrient_content, only: [:show, :update, :destroy]

  def index
    nutrient_contents = NutrientContent.all

    render json: {
      nutrient_contents:
    }, status: :ok
  end

  def show
    render json: {
      nutrient_content: @nutrient_content
    }, status: :ok
  end

  def create
    nutrient_content = NutrientContent.new(nutrient_content_params)
    if nutrient_content.save
      render json: {
        nutrient_content:
      }, status: :created
    else
      render json: {
        errors: nutrient_content.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @nutrient_content.update(nutrient_content_params)
      render json: {
        nutrient_content: @nutrient_content
      }, status: :ok
    else
      render json: {
        errors: @nutrient_content.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @nutrient_content.destroy
      render json: {
        nutrient_content: @nutrient_content
      }, status: :ok
    else
      render json: {
        errors: @nutrient_content.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_nutrient_content
    @nutrient_content = NutrientContent.find(params[:id])
  end

  def nutrient_content_params
    params.require(:nutrient_content).permit(:nutrient_content, :food_id, :nutrient_id)
  end
end

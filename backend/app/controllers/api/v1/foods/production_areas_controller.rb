class Api::V1::Foods::ProductionAreasController < ApplicationController
  before_action :set_production_area, only: [:show, :update, :destroy]

  def index
    production_areas = ProductionArea.all

    render json: {
      production_areas:
    }, status: :ok
  end

  def show
    render json: {
      production_area: @production_area
    }, status: :ok
  end

  def create
    production_area = ProductionArea.new(production_area_params)
    if production_area.save
      render json: {
        production_area:
      }, status: :created
    else
      render json: {
        errors: production_area.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @production_area.update(production_area_params)
      render json: {
        production_area: @production_area
      }, status: :ok
    else
      render json: {
        errors: @production_area.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @production_area.destroy
      render json: {
        production_area: @production_area
      }, status: :ok
    else
      render json: {
        errors: @production_area.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_production_area
    @production_area = ProductionArea.find(params[:id])
  end

  def production_area_params
    params.require(:production_area).permit(:production_area)
  end
end

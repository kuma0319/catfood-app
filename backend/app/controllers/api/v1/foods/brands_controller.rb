class Api::V1::Foods::BrandsController < ApplicationController
  before_action :set_brand, only: [:show, :update, :destroy]

  def index
    brands = Brand.all

    render json: {
      brands:
    }, status: :ok
  end

  def show
    render json: {
      brand: @brand
    }, status: :ok
  end

  def create
    brand = Brand.new(brand_params)
    if brand.save
      render json: {
        brand:
      }, status: :created
    else
      render json: {
        errors: brand.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @brand.update(brand_params)
      render json: {
        brand: @brand
      }, status: :ok
    else
      render json: {
        errors: @brand.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @brand.destroy
      render json: {
        brand: @brand
      }, status: :ok
    else
      render json: {
        errors: @brand.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_brand
    @brand = Brand.find(params[:id])
  end

  def brand_params
    params.require(:brand).permit(:brand)
  end
end

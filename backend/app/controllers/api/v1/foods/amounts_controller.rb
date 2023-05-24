class Api::V1::Foods::AmountsController < ApplicationController
  before_action :set_amount, only: [:show, :update, :destroy]

  def index
    @amounts = Amount.includes(:food).all

    render status: :ok
  end

  def show
    render json: {
      amount: @amount
    }, status: :ok
  end

  def create
    amount = Amount.new(amount_params)
    if amount.save
      render json: {
        amount:
      }, status: :created
    else
      render json: {
        errors: amount.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @amount.update(amount_params)
      render json: {
        amount: @amount
      }, status: :ok
    else
      render json: {
        errors: @amount.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @amount.destroy
      render json: {
        amount: @amount
      }, status: :ok
    else
      render json: {
        errors: @amount.errors
      }, status: :unprocessable_entity
    end
  end

  private

  def set_amount
    @amount = Amount.find(params[:id])
  end

  def amount_params
    params.require(:amount).permit(:amount, :price, :food_id)
  end
end

class Api::V1::Foods::WatchListsController < ApplicationController
  def index
    @foods = Food.includes(:brand, :production_area, :food_type, { nutrient_contents: :nutrient }, :amounts)
      .with_attached_images
      .order("brands.name", "foods.name")
      .where(id: params[:ids])

    render status: :ok
  end
end

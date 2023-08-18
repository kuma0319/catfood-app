class Api::V1::Foods::FoodsController < ApplicationController
  before_action :set_food, only: [:update, :destroy]

  def index
    @foods = Food.includes(:brand, :production_area, :food_type, { nutrient_contents: :nutrient }, :amounts)
      .order("brands.name", "foods.name")
      .page(params[:page]).per(30) # 1ページあたり30件でページネーション
  end

  # 商品詳細ページの事前ビルド用に全フードのidのみを返す
  def index_ids
    foods = Food.select(:id)
    render json: foods
  end

  def show
    @food = Food.includes(:brand, :production_area, :food_type, :nutrients, :nutrient_contents, :amounts)
      .find(params[:id])
  end

  def search
    @foods = Food.includes(:brand, :production_area, :food_type, { nutrient_contents: :nutrient }, :amounts)
      .order("brands.name", "foods.name")
      .by_brand(params[:brand_id])
      .by_food_type(params[:food_type_id])
      .by_production_area(params[:production_area_id])
      .by_target_age(params[:target_age_id])
      .by_calorie(params[:min_calorie], params[:max_calorie])
      .by_amount(params[:min_amount], params[:max_amount])
      .by_price(params[:min_price], params[:max_price])
      .by_nutrient_content(Nutrient::PROTEIN_ID, params[:min_protein_content], params[:max_protein_content])  # Nutrientモデルの定数から各idを指定
      .by_nutrient_content(Nutrient::FAT_ID, params[:min_fat_content], params[:max_fat_content])
      .by_nutrient_content(Nutrient::FIBRE_ID, params[:min_fibre_content], params[:max_fibre_content])
      .by_nutrient_content(Nutrient::ASH_ID, params[:min_ash_content], params[:max_ash_content])
      .by_nutrient_content(Nutrient::MOISTURE_ID, params[:min_moisture_content], params[:max_moisture_content])
      .by_nutrient_content(Nutrient::CARBOHYDRATES_ID, params[:min_carbohydrates_content], params[:max_carbohydrates_content])
      .by_food_name(params[:food_name])
      .by_not_food_name(params[:not_food_name])
      .by_ingredients(params[:ingredients])
      .by_not_ingredients(params[:not_ingredients])
      .page(params[:page]).per(30) # 1ページあたり30件でページネーション
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

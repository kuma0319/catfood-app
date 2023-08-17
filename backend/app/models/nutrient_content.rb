class NutrientContent < ApplicationRecord
  belongs_to :food
  belongs_to :nutrient

  validates :content, numericality: { greater_than: 0 }
  validates :nutrient_id, uniqueness: { scope: :food_id }
end

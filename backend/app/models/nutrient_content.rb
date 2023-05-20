class NutrientContent < ApplicationRecord
  belongs_to :food
  belongs_to :nutrient

  validates :nutrient_content, numericality: { greater_than: 0 }
end

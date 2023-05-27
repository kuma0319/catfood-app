class NutrientContent < ApplicationRecord
  belongs_to :food
  belongs_to :nutrient

  validates :content, numericality: { greater_than: 0 }
end

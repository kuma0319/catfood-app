class FoodType < ApplicationRecord
  has_many :foods

  validates :food_type, presence: true, uniqueness: true, length: { maximum: 10 }
end

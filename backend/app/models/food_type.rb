class FoodType < ApplicationRecord
  has_many :foods, dependent: :restrict_with_exception

  validates :food_type, presence: true, uniqueness: true, length: { maximum: 10 }
end

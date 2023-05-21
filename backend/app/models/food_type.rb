class FoodType < ApplicationRecord
  has_many :foods, dependent: :restrict_with_exception  #削除は想定していないため例外発生

  validates :food_type, presence: true, uniqueness: true, length: { maximum: 10 }
end

class Nutrient < ApplicationRecord
  has_many :nutrient_contents, dependent: :restrict_with_exception  #削除は想定していないため例外発生

  validates :nutrient, presence: true, uniqueness: true, length: { maximum: 30 }
end

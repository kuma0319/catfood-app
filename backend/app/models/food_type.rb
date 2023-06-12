class FoodType < ApplicationRecord
  has_many :foods, dependent: :restrict_with_exception  # 削除は想定していないため例外発生

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 30 }
end

class Brand < ApplicationRecord
  has_many :foods, dependent: :restrict_with_exception  # 削除は想定していないため例外発生

  validates :brand, presence: true, uniqueness: true, length: { maximum: 30 }
end

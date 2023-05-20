class ProductionArea < ApplicationRecord
  has_many :foods

  validates :production_area, presence: true, uniqueness: true, length: { maximum: 30 }
end

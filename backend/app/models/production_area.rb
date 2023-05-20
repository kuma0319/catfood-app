class ProductionArea < ApplicationRecord
  has_many :foods, dependent: :restrict_with_exception

  validates :production_area, presence: true, uniqueness: true, length: { maximum: 30 }
end

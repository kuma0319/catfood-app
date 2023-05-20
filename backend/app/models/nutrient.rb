class Nutrient < ApplicationRecord
  has_many :nutrient_contents, dependent: :restrict_with_exception

  validates :nutrient, presence: true, uniqueness: true, length: { maximum: 30 }
end

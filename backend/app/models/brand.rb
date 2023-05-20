class Brand < ApplicationRecord
  has_many :foods

  validates :brand, presence: true, uniqueness: true, length: { maximum: 30 }
end

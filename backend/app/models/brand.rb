class Brand < ApplicationRecord
  has_many :foods, dependent: :restrict_with_exception

  validates :brand, presence: true, uniqueness: true, length: { maximum: 30 }
end

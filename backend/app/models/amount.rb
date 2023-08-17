class Amount < ApplicationRecord
  belongs_to :food

  validates :amount, numericality: { greater_than: 0 }, uniqueness: { scope: :food_id }
end

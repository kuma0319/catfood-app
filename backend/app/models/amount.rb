class Amount < ApplicationRecord
  belongs_to :food

  validates :amount, :price, numericality: {greater_than: 0}
end

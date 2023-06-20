class Amount < ApplicationRecord
  belongs_to :food

  validates :amount, numericality: { greater_than: 0 }
end

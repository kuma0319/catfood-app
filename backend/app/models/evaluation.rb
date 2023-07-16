class Evaluation < ApplicationRecord
  belongs_to :review
  belongs_to :review_item

  validates :score, presence: true
end

class Evaluation < ApplicationRecord
  belongs_to :review
  belongs_to :review_item

  # scoreは0~5の整数のみ許容する
  validates :score, presence: true, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5
  }

  # 同一のレビューにおいてreview_item_idは一意でなければならない
  validates :review_item_id, uniqueness: { scope: :review_id }
end

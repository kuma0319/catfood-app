class Review < ApplicationRecord
  belongs_to :user
  belongs_to :food

  has_many :evaluations, dependent: :destroy

  has_many :review_items, through: :evaluations

  # 1人のユーザーが同じフードを複数レビューしないようにバリデーション
  validates :user_id, uniqueness: { scope: :food_id }
  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true, length: { maximum: 10000 }
end

class Review < ApplicationRecord
  belongs_to :user
  belongs_to :food

  has_many :evaluations, dependent: :destroy

  # 1人のユーザーが同じフードを複数レビューしないようにバリデーション
  validates :user_id, uniqueness: { scope: :food_id }
  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true, length: { maximum: 10000 }
end

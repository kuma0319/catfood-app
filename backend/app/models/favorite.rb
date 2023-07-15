class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :food

  # 1人のユーザーが同じフードを複数お気に入りにしないようにバリデーション
  validates :user_id, uniqueness: { scope: :food_id }
end

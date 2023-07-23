class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true, length: { maximum: 10_000 }

  # 1つの質問に同一のユーザーは回答を持てない
  validates :user_id, uniqueness: { scope: :question_id }
end

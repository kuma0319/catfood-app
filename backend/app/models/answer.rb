class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :content, presence: true, length: { maximum: 10_000 }

  # 1つの質問に同一のユーザーは回答を持てない
  validates :user_id, uniqueness: { scope: :question_id }

  # ユーザーは自身の質問に対して回答は出来ないカスタムバリデーション
  validate :cannot_answer_own_question

  private

  # questionに紐づいているuser_idとanswerのuser_idが同一である場合にエラーとなる
  def cannot_answer_own_question
    errors.add(:user_id, "自身の投稿した質問に回答は出来ません。") if question.user_id == user_id
  end
end

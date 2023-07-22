class Evaluation < ApplicationRecord
  belongs_to :review
  belongs_to :review_item

  # scoreは1~5の整数のみ許容する
  validates :score, presence: true, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 5
  }

  # 同一のレビューにおいてreview_item_idは一意でなければならない
  validates :review_item_id, uniqueness: { scope: :review_id }

  # paramsとしてfood_idを引数で受け取り、特定のフードにおける各評価項目についてmapでスコアを返す
  def self.average_scores(food_id)
    ReviewItem.all.map do |review_item|
      average_score = review_item.evaluations.joins(:review).where(reviews: { food_id: }).average(:score).to_f
      # スコアが0の場合は実質的にレビューが存在しないため空配列を返したい
      next unless average_score > 0

      {
        id: review_item.id,
        name: review_item.name,
        value: average_score
      }
    end.compact # これ(.compact)を入れないと中身が全てnullの配列が返される
  end
end

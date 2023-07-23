class Question < ApplicationRecord
  belongs_to :user
  has_many :answers, dependent: :destroy

  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true, length: { maximum: 10_000 }
end

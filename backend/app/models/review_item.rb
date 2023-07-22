class ReviewItem < ApplicationRecord
  has_many :evaluations, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 30 }
end

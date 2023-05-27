class Food < ApplicationRecord
  # モデルでurl_forメソッドを使用するためのヘルパーをinclude
  include Rails.application.routes.url_helpers

  belongs_to :brand
  belongs_to :production_area
  belongs_to :food_type
  has_many :nutrient_contents, dependent: :destroy
  has_many :nutrients, through: :nutrient_contents
  has_many :amounts, dependent: :destroy
  has_many_attached :images

  validates :name, presence: true, length: { maximum: 50 }
  validates :calorie, numericality: { greater_than: 0 }

  # imageのURLを返すメソッド
  def image_urls
    images.attached? ? images.map { |image| url_for(image) } : []
  end
end

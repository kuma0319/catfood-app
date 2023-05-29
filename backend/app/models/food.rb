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

  ##フード検索用のscope一覧
  #一致検索（ブランド、産地、フードタイプ）
  scope :by_brand, -> (brand_id) { 
    where(brand_id: brand_id) if brand_id.present?
  }

  scope :by_food_type, -> (food_type_id) {
    where(food_type_id: food_type_id) if food_type_id.present?
  }
  
  scope :by_production_area, -> (production_area_id) {
    where(production_area_id: production_area_id) if production_area_id.present?
  }
  
  #範囲検索（カロリー、各種成分含有量、内容量、料金）
  scope :by_calorie, -> (min_calorie, max_calorie) do
    if min_calorie.present? && max_calorie.present?
      where(calorie: min_calorie..max_calorie) 
    elsif min_calorie.present?
      where(calorie: min_calorie..) 
    elsif max_calorie.present?
      where(calorie: ..max_calorie) 
    end
  end

  scope :by_nutrient_content, -> (nutrient_id, min_nutrient_content, max_nutrient_content) do
    if min_nutrient_content.present? && max_nutrient_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrient_id, content: min_nutrient_content..max_nutrient_content })
        .distinct
    elsif min_nutrient_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrient_id, content: min_nutrient_content.. })
        .distinct
    elsif max_nutrient_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrient_id, content: ..max_nutrient_content })
        .distinct
    end
  end

  scope :by_amount, -> (min_amount, max_amount) do
    if min_amount.present? && max_amount.present?
      joins(:amounts)
        .where(amounts: { amount: min_amount..max_amount })
        .distinct
    elsif min_amount.present?
      joins(:amounts)
        .where(amounts: { amount: min_amount.. })
        .distinct
    elsif max_amount.present?
      joins(:amounts)
        .where(amounts: { amount: ..max_amount })
        .distinct
    end
  end

  scope :by_price, -> (min_price, max_price) do
    if min_price.present? && max_price.present?
      joins(:amounts)
        .where(amounts: { price: min_price..max_price })
        .distinct
    elsif min_price.present?
      joins(:amounts)
        .where( amounts: { price: min_price.. })
        .distinct
    elsif max_price.present?
      joins(:amounts)
        .where( amounts: { price: ..max_price })
        .distinct
    end
  end
end
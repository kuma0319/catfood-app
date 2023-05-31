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

  # #フード検索用のscope一覧
  # 一致検索（ブランド、産地、フードタイプ）
  scope :by_brand, lambda { |brand_id|
    where(brand_id:) if brand_id.present?
  }

  scope :by_food_type, lambda { |food_type_id|
    where(food_type_id:) if food_type_id.present?
  }

  scope :by_production_area, lambda { |production_area_id|
    where(production_area_id:) if production_area_id.present?
  }

  # 範囲検索（カロリー、内容量、料金）
  scope :by_calorie, lambda { |min_calorie, max_calorie|
    if min_calorie.present? && max_calorie.present?
      where(calorie: min_calorie..max_calorie)
    elsif min_calorie.present?
      where(calorie: min_calorie..)
    elsif max_calorie.present?
      where(calorie: ..max_calorie)
    end
  }

  scope :by_amount, lambda { |min_amount, max_amount|
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
  }

  scope :by_price, lambda { |min_price, max_price|
    if min_price.present? && max_price.present?
      joins(:amounts)
        .where(amounts: { price: min_price..max_price })
        .distinct
    elsif min_price.present?
      joins(:amounts)
        .where(amounts: { price: min_price.. })
        .distinct
    elsif max_price.present?
      joins(:amounts)
        .where(amounts: { price: ..max_price })
        .distinct
    end
  }

  # 各種成分含有量の範囲検索
  nutrients = [
    { id: 1, name: 'protein' },
    { id: 2, name: 'fat' },
    { id: 3, name: 'fibre' },
    { id: 4, name: 'ash' },
    { id: 5, name: 'moisture' }
  ]

  scope :by_protein_content, lambda { |min_protein_content, max_protein_content|
    if min_protein_content.present? && max_protein_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[0][:id], content: min_protein_content..max_protein_content })
        .distinct
    elsif min_protein_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[0][:id], content: min_protein_content.. })
        .distinct
    elsif max_protein_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[0][:id], content: ..max_protein_content })
        .distinct
    end
  }

  scope :by_fat_content, lambda { |min_fat_content, max_fat_content|
    if min_fat_content.present? && max_fat_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[1][:id], content: min_fat_content..max_fat_content })
        .distinct
    elsif min_fat_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[1][:id], content: min_fat_content.. })
        .distinct
    elsif max_fat_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[1][:id], content: ..max_fat_content })
        .distinct
    end
  }

  scope :by_fibre_content, lambda { |min_fibre_content, max_fibre_content|
    if min_fibre_content.present? && max_fibre_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[2][:id], content: min_fibre_content..max_fibre_content })
        .distinct
    elsif min_fibre_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[2][:id], content: min_fibre_content.. })
        .distinct
    elsif max_fibre_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[2][:id], content: ..max_fibre_content })
        .distinct
    end
  }

  scope :by_ash_content, lambda { |min_ash_content, max_ash_content|
    if min_ash_content.present? && max_ash_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[3][:id], content: min_ash_content..max_ash_content })
        .distinct
    elsif min_ash_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[3][:id], content: min_ash_content.. })
        .distinct
    elsif max_ash_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[3][:id], content: ..max_ash_content })
        .distinct
    end
  }

  scope :by_moisture_content, lambda { |min_moisture_content, max_moisture_content|
    if min_moisture_content.present? && max_moisture_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[4][:id], content: min_moisture_content..max_moisture_content })
        .distinct
    elsif min_moisture_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[4][:id], content: min_moisture_content.. })
        .distinct
    elsif max_moisture_content.present?
      joins(:nutrient_contents)
        .where(nutrient_contents: { nutrient_id: nutrients[4][:id], content: ..max_moisture_content })
        .distinct
    end
  }
end

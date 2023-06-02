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

  # 成分含有量の範囲検索
  # 同一テーブルに対して複数回joinするためにSQLのASを使用して"nutrient_id"を含ませたエイリアスを作成
  scope :by_nutrient_content, lambda { |nutrient_id, min_nutrient_content, max_nutrient_content|
    if min_nutrient_content.present? && max_nutrient_content.present?
      joins("INNER JOIN nutrient_contents AS nutrient_content_#{nutrient_id} ON foods.id = nutrient_content_#{nutrient_id}.food_id")
        .where("nutrient_content_#{nutrient_id}": { nutrient_id:, content: min_nutrient_content..max_nutrient_content })
        .distinct
    elsif min_nutrient_content.present?
      joins("INNER JOIN nutrient_contents AS nutrient_content_#{nutrient_id} ON foods.id = nutrient_content_#{nutrient_id}.food_id")
        .where("nutrient_content_#{nutrient_id}": { nutrient_id:, content: min_nutrient_content.. })
        .distinct
    elsif max_nutrient_content.present?
      joins("INNER JOIN nutrient_contents AS nutrient_content_#{nutrient_id} ON foods.id = nutrient_content_#{nutrient_id}.food_id")
        .where("nutrient_content_#{nutrient_id}": { nutrient_id:, content: ..max_nutrient_content })
        .distinct
    end
  }

  # 名前のキーワード検索
  scope :by_food_name, lambda { |food_names|
    if food_names.present?
      # Next.js側で単一の情報だと文字列として渡され、reduce部分でエラー発生するためこの処理が必要
      if food_names.is_a?(String)
        where("name LIKE ?", "%#{food_names}%")
      else
        # reduceで初期値self(Foodクラスそのもの)をセットし、where句を連結させる
        # 最終的にFood.where("name LIKE ?", "%#{food_name}%.where~~~というscopeが得られる
        food_names.reduce(self) { |accumulator, food_name| accumulator.where("name LIKE ?", "%#{food_name}%") }
      end
    end
  }

  scope :by_not_food_name, lambda { |not_food_names|
    if not_food_names.present?
      if not_food_names.is_a?(String)
        where("name NOT LIKE?", "%#{not_food_names}%")
      else
        not_food_names.reduce(self) { |accumulator, not_food_name| accumulator.where("name NOT LIKE ?", "%#{not_food_name}%") }
      end
    end
  }

  # 原料のキーワード検索
  scope :by_ingredients, lambda { |ingredients|
    if ingredients.present?
      if ingredients.is_a?(String)
        where("ingredients LIKE?", "%#{ingredients}%")
      else
        ingredients.reduce(self) { |accumulator, ingredient| accumulator.where("ingredients LIKE ?", "%#{ingredient}%") }
      end
    end
  }

  scope :by_not_ingredients, lambda { |not_ingredients|
    if not_ingredients.present?
      if not_ingredients.is_a?(String)
        where("ingredients NOT LIKE?", "%#{not_ingredients}%")
      else
        not_ingredients.reduce(self) { |accumulator, not_ingredient| accumulator.where("ingredients NOT LIKE ?", "%#{not_ingredient}%") }
      end
    end
  }
end

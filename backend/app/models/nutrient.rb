class Nutrient < ApplicationRecord
  has_many :nutrient_contents, dependent: :restrict_with_exception  # 削除は想定していないため例外発生

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 30 }

  # 各栄養素のID管理
  PROTEIN_ID = 1
  FAT_ID = 2
  FIBRE_ID = 3
  ASH_ID = 4
  MOISTURE_ID = 5
end

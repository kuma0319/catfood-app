class Nutrient < ApplicationRecord
  has_many :nutrient_contents

  validates :nutrient, presence: true, uniqueness: true, length: { maximum: 30 }
end

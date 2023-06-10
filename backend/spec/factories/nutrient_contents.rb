FactoryBot.define do
  factory :protein_content, class: NutrientContent do
    content  { rand(20.0..50.0).ceil(1) }
    association :nutrient, factory: :protein
  end
  factory :fat_content, class: NutrientContent do
    content { rand(5.0..30.0).ceil(1) }
    association :nutrient, factory: :fat
  end
  factory :fibre_content, class: NutrientContent do
    content { rand(1.0..15.0).ceil(1) }
    association :nutrient, factory: :fibre
  end
  factory :ash_content, class: NutrientContent do
    content { rand(1.0..20.0).ceil(1) }
    association :nutrient, factory: :ash
  end
  factory :moisture_content, class: NutrientContent do
    content { rand(1.0..20.0).ceil(1) }
    association :nutrient, factory: :moisture
  end
end

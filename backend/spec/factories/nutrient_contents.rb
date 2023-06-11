FactoryBot.define do
  factory :nutrient_content do
    content  { rand(20.0..50.0).ceil(1) }
    association :nutrient
  end
  factory :protein_content, class: NutrientContent do
    nutrient_id {1}
    content  { rand(20.0..50.0).ceil(1) }
    association :nutrient, factory: :protein
  end
  factory :fat_content, class: NutrientContent do
    nutrient_id {2}
    content { rand(5.0..30.0).ceil(1) }
    association :nutrient, factory: :fat
  end
  factory :fibre_content, class: NutrientContent do
    nutrient_id {3}
    content { rand(1.0..15.0).ceil(1) }
    association :nutrient, factory: :fibre
  end
  factory :ash_content, class: NutrientContent do
    nutrient_id {4}
    content { rand(1.0..20.0).ceil(1) }
    association :nutrient, factory: :ash
  end
  factory :moisture_content, class: NutrientContent do
    nutrient_id {5}
    content { rand(1.0..20.0).ceil(1) }
    association :nutrient, factory: :moisture
  end
end

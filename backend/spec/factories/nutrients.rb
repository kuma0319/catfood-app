FactoryBot.define do
  factory :protein, class: Nutrient do
    name { "タンパク質" }
  end
  factory :fat, class: Nutrient do
    name { "脂質" }
  end
  factory :fibre, class: Nutrient do
    name { "粗繊維" }
  end
  factory :ash, class: Nutrient do
    name { "灰分" }
  end
  factory :moisture, class: Nutrient do
    name { "水分" }
  end
end

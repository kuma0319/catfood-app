FactoryBot.define do
  factory :nutrient do
    name { "テスト成分" }
  end
  factory :protein, class: Nutrient do
    id {1}
    name { "タンパク質" }
  end
  factory :fat, class: Nutrient do
    id {2}
    name { "脂質" }
  end
  factory :fibre, class: Nutrient do
    id {3}
    name { "粗繊維" }
  end
  factory :ash, class: Nutrient do
    id {4}
    name { "灰分" }
  end
  factory :moisture, class: Nutrient do
    id {5}
    name { "水分" }
  end
end

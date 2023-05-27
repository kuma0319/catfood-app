FactoryBot.define do
  factory :food do
    name { "MyString" }
    image { "MyString" }
    ingredients { "MyText" }
    brand { nil }
    production_area { nil }
    food_type { nil }
    calorie { 1 }
  end
end

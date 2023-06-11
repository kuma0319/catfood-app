FactoryBot.define do
  factory :food_type do
    sequence(:name) { |n| "テストフードタイプ#{n}" }
  end
end

FactoryBot.define do
  factory :target_age do
    sequence(:name) { |n| "ステージ#{n}" }
  end
end

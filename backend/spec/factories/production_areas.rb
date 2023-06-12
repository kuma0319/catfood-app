FactoryBot.define do
  factory :production_area do
    sequence(:name) { |n| "テスト産地#{n}" }
  end
end

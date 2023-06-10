FactoryBot.define do
  factory :brand do
    sequence(:name) { |n| "テストブランド#{n}" }
  end
end

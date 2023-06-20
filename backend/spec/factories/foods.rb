FactoryBot.define do
  factory :food do
    sequence(:name) { |n| "テストキャットフード#{n}" }
    ingredients { "チキン、サーモン、穀類、香料、着色料" }
    association :brand
    association :production_area
    association :food_type
    calorie { rand(200..500) }
    sequence(:rakuten_name) { |n| "楽天テスト#{n}" }
    min_price { rand(100..1000) }
  end

  # 成分含有量を追加する際のtrait
  trait :with_nutrient_contents do
    after(:create) do |food|
      create(:nutrient_content, food:)
    end
  end

  # 5つの成分含有量を追加する際のtrait
  trait :with_all_nutrient_contents do
    after(:create) do |food|
      create(:protein_content, food:)
      create(:fat_content, food:)
      create(:fibre_content, food:)
      create(:ash_content, food:)
      create(:moisture_content, food:)
    end
  end

  # 内容量をtraitで関連付け
  trait :with_amounts do
    after(:create) do |food|
      create(:amount, food:)
    end
  end
end

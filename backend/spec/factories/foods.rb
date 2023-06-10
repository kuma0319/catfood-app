FactoryBot.define do
  factory :food do
    sequence(:name) { |n| "テストキャットフード#{n}" }
    ingredients { "チキン、サーモン、穀類、香料、着色料" }
    association :brand
    association :production_area
    association :food_type
    calorie { rand(200..500) }
  end

  #成分含有量をtraitで関連付け
  trait :with_nuteient_content do
    after(:create) do |food|
      create(:protein_content, food: food)
      create(:fat_content, food: food)
      create(:fibre_content, food: food)
      create(:ash_content, food: food)
      create(:moisture_content, food: food)
    end
  end

  #内容量、金額をtraitで関連付け
  trait :with_amount do
    after(:create) do |food|
      create(:amount, food: food)
    end
  end

end

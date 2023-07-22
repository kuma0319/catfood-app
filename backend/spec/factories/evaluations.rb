FactoryBot.define do
  factory :evaluation do
    review
    review_item
    score { 1 }
  end
end

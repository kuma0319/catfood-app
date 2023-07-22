FactoryBot.define do
  factory :review do
    user { nil }
    food { nil }
    title { "MyString" }
    content { "MyText" }
  end
end

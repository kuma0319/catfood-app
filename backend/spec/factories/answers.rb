FactoryBot.define do
  factory :answer do
    title { "MyString" }
    content { "MyText" }
    user { nil }
    question { nil }
  end
end

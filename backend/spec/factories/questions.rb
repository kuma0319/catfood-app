FactoryBot.define do
  factory :question do
    title { "MyString" }
    content { "MyText" }
    user
  end
end

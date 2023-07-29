FactoryBot.define do
  factory :answer do
    content { "MyText" }
    user
    question
  end
end

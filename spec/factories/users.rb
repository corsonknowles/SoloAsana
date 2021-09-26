FactoryBot.define do
  factory :user do
    email
    transient do
      password { 'rainbow_table' }
    end
    username { 'Robert the Chief' }
    after(:build) do |user, evaluator|
      user.password = evaluator.password
    end
  end
end

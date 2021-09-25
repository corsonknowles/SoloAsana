FactoryBot.define do
  factory :user do
    email
    username { 'Robert the Chief' }
    before(:create) { |user| user.password = 'rainbow_table' }
  end
end

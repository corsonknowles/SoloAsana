FactoryBot.define do
  factory :task do
    title { 'a thing to do' }
    body { 'this is the text' }
    user
    team
    project
  end
end

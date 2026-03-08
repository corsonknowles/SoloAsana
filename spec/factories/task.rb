# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { "a thing to do" }
    body { "this is the text" }
    done { false }
    section { false }
    user
    team
    project
  end
end

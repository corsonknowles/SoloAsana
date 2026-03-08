# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  about           :string
#  department      :string
#  email           :string           not null
#  latest_project  :integer
#  password_digest :string           not null
#  photo           :string
#  role            :string
#  session_token   :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#

FactoryBot.define do
  factory :user do
    email
    transient do
      password { "rainbow_table" }
    end
    username { "Robert the Chief" }
    after(:build) do |user, evaluator|
      user.password = evaluator.password
    end

    # Use when a spec controls its own project set and does not want the
    # auto-project that User#initialize_project creates after_create.
    trait :without_initial_project do
      after(:create) { |user| user.projects.delete_all }
    end
  end
end

# frozen_string_literal: true
# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string
#  role            :string
#  department      :string
#  about           :string
#  photo           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  latest_project  :integer
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
  end
end

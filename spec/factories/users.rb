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
#  index_users_on_email  (email)
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

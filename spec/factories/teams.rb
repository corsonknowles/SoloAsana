# frozen_string_literal: true

# == Schema Information
#
# Table name: teams
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_teams_on_user_id  (user_id)
#
FactoryBot.define do
  factory :team do
    name { "Important Team" }
    user
  end
end

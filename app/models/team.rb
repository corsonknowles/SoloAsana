# frozen_string_literal: true
# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  name       :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_teams_on_user_id  (user_id)
#

class Team < ApplicationRecord
  belongs_to :user
  has_many :projects, dependent: :nullify
  has_many :tasks, dependent: :nullify

  validates :name, length: { maximum: 255 }
end

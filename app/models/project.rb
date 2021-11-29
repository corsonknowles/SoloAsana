# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_projects_on_team_id  (team_id)
#  index_projects_on_user_id  (user_id)
#
class Project < ApplicationRecord
  belongs_to :user
  belongs_to :team, optional: true
  has_many :tasks, dependent: :destroy

  validates :user_id, presence: true
  validates :name, length: { maximum: 255 }, allow_nil: true
end

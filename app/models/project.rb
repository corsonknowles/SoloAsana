# frozen_string_literal: true
# == Schema Information
#
# Table name: projects
#
#  id         :integer          not null, primary key
#  name       :string
#  team_id    :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_projects_on_team_id  (team_id)
#  index_projects_on_user_id  (user_id)
#

class Project < ApplicationRecord
  belongs_to :user
  belongs_to :team, optional: true
  has_many :tasks, dependent: :delete_all # NOTE: this may be incompatible with teams

  validates :name, length: { maximum: 255 }, allow_nil: true

  after_create :initialize_task
  before_destroy :must_have_a_project

  private

  def initialize_task
    return if tasks.any?

    tasks.create!(user: user)
  end

  def must_have_a_project
    return unless user
    return unless user.projects.one?

    errors.add(:base, :undestroyable)
    throw :abort
  end
end

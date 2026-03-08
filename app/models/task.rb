# frozen_string_literal: true
# == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  title      :string
#  body       :text
#  due        :integer
#  done       :boolean
#  user_id    :integer
#  project_id :integer
#  team_id    :integer
#  section    :boolean
#  task_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tasks_on_project_id  (project_id)
#  index_tasks_on_task_id     (task_id)
#  index_tasks_on_team_id     (team_id)
#  index_tasks_on_user_id     (user_id)
#

class Task < ApplicationRecord
  belongs_to :user
  belongs_to :project
  belongs_to :team, optional: true

  before_destroy :must_have_a_task

  def must_have_a_task
    return unless project.tasks.one?

    errors.add(:base, :undestroyable)
    throw :abort
  end
end

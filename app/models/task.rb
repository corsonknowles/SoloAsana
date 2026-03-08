# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id         :bigint           not null, primary key
#  body       :text
#  done       :boolean          default(FALSE), not null
#  due        :integer
#  section    :boolean          default(FALSE), not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :bigint
#  task_id    :bigint
#  team_id    :bigint
#  user_id    :bigint
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
  belongs_to :parent_task, class_name: "Task", foreign_key: :task_id,
                           optional: true, inverse_of: :subtasks
  has_many :subtasks, class_name: "Task", dependent: :destroy,
                      inverse_of: :parent_task

  before_destroy :must_have_a_task

  def must_have_a_task
    return if task_id.present? # subtasks can always be deleted

    return unless project.tasks.where(task_id: nil).one?

    errors.add(:base, :undestroyable)
    throw :abort
  end
end

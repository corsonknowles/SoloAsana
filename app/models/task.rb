# == Schema Information
#
# Table name: tasks
#
#  id         :bigint           not null, primary key
#  body       :text
#  done       :boolean
#  due        :integer
#  section    :boolean
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

  validates :user_id, presence: true
  validates :project_id, presence: true
end

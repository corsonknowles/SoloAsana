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

RSpec.describe Task, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to belong_to(:team).optional }
end

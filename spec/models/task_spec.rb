# frozen_string_literal: true

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

  it { is_expected.to validate_presence_of(:user_id) }
  it { is_expected.to validate_presence_of(:project_id) }

  context 'when a project has a task' do
    let!(:project) { create(:project) }
    let(:task) { project.tasks.first }
    it 'cannot delete the last task for a project' do
      expect { task.destroy }.not_to change(Task, :count)
    end

    context 'when it is not the last task' do
      let!(:second_task) { create(:task, project: project) }

      it 'can be destroyed' do
        expect { task.destroy }.to change(Task, :count).by(-1)
      end
    end
  end
end

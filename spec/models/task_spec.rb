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

RSpec.describe Task, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to belong_to(:team).optional }

  context "when a project has a task" do
    let!(:project) { create(:project) }
    let(:task) { project.tasks.first }

    it "cannot delete the last task for a project" do
      expect { task.destroy }.not_to change(described_class, :count)
    end

    context "when it is not the last task" do
      let!(:second_task) { create(:task, project: project) }

      it "can be destroyed" do
        expect { task.destroy }.to change(described_class, :count).by(-1)
      end
    end
  end
end

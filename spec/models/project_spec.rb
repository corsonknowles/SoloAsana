# frozen_string_literal: true

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

RSpec.describe Project, type: :model do
  context 'with validations and relations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:team).optional }
    it { is_expected.to have_many(:tasks) }

    it { is_expected.to validate_presence_of(:user_id) }
    it { is_expected.to validate_length_of(:name) }
  end


  context 'when it is not the last project' do
    let(:user) { create(:user) }
    let!(:projects) { create_list(:project, 2, user: user) }
    let(:project) { user.projects.first }
    let(:project_id) { project.id }

    it 'can be destroyed' do
      expect { project.destroy }.to change(Project, :count).by(-1)
    end

    it 'can be deleted' do
      expect { project.delete }.to change(Project, :count).by(-1)
    end
  end

  context 'when a user has a project' do
    let!(:user) { create(:user) }
    let!(:project) { user.projects.first }

    it 'cannot destroy the last project for a user' do
      expect { project.destroy }.not_to change(Project, :count)
    end

    it 'can still delete the last project for a user' do
      expect { project.delete }.to change(Project, :count).by(-1)
    end
  end
end

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
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:team).optional }
  it { is_expected.to have_many(:tasks) }

  it { is_expected.to validate_presence_of(:user_id) }
  it { is_expected.to validate_length_of(:name) }
end

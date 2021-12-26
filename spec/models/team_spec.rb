# frozen_string_literal: true

# == Schema Information
#
# Table name: teams
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_teams_on_user_id  (user_id)
#

RSpec.describe Team, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:projects) }
  it { is_expected.to have_many(:tasks) }
end

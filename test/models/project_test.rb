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
require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

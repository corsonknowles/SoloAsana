require 'rails_helper'

RSpec.describe Task, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:project) }
  it { is_expected.to belong_to(:team) }
end

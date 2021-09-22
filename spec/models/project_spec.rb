require 'rails_helper'

RSpec.describe Project, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:team) }
  it { is_expected.to have_many(:tasks) }
end

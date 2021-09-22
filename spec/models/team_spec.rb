require 'rails_helper'

RSpec.describe Team, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:projects) }
  it { is_expected.to have_many(:tasks) }
end

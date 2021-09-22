require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of(:username) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:password).allow_nil }

  it { is_expected.to have_many(:tasks) }
  it { is_expected.to have_many(:projects) }
  it { is_expected.to have_many(:teams) }

  describe '.find_by_credentials' do
  end

  describe '#password=' do
  end

  describe '#password_is?' do
  end

  describe '#reset_session_token!' do
  end
end

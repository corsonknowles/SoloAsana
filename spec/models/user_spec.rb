# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  about           :string
#  department      :string
#  email           :string           not null
#  latest_project  :integer
#  password_digest :string           not null
#  photo           :string
#  role            :string
#  session_token   :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email)
#
require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of(:username) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:password).allow_nil }

  it { is_expected.to have_many(:tasks) }
  it { is_expected.to have_many(:projects) }
  it { is_expected.to have_many(:teams) }

  describe '.find_by_credentials' do
    subject { described_class.find_by_credentials(email, example_password) }

    let(:user) { create :user }
    let(:example_password) { 'example_password' }
    let(:email) { user.email }

    context 'when set to the example password' do
      before do
        user.password = example_password
        user.save!
      end

      it { is_expected.to eq user }
    end

    it { is_expected.to be nil }
  end

  describe '#password=' do
    subject { user.password = example_password }

    let(:user) { create :user }
    let(:example_password) { 'example_password' }

    it 'alters the password digest' do
      expect { subject }.to(change { user.password_digest })
    end
  end

  describe '#password_is?' do
    subject { user.password_is?(example_password) }

    let(:example_password) { 'example_password' }
    let(:user) { create(:user) }

    context 'when set to the example password' do
      before { user.password = example_password }

      it { is_expected.to be true }
    end

    it { is_expected.to be false }
  end

  describe '#reset_session_token!' do
    subject(:reset) { user.reset_session_token! }

    let(:user) { create(:user) }

    context 'with multiple users' do
      let(:user_id) { user.id }
      let(:user2) { create(:user) }

      it 'will never match another user session token' do
      end
    end
  end
end

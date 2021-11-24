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

RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of(:username) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:password_digest) }
  it { is_expected.to validate_presence_of(:session_token) }
  it { is_expected.to validate_presence_of(:password).allow_nil }

  it { is_expected.to have_many(:tasks) }
  it { is_expected.to have_many(:projects) }
  it { is_expected.to have_many(:teams) }

  describe '.find_by_credentials' do
    subject { described_class.find_by_credentials(email, example_password) }

    let(:user) { create :user }
    let(:example_password) { 'example_password' }
    let(:email) { user.email }

    it { is_expected.to be nil }

    context 'when user has the example password' do
      let(:user) { create(:user, password: example_password) }

      it { is_expected.to eq user }
    end
  end

  describe '#password=' do
    subject { user.password = example_password }

    let(:user) { build :user }
    let(:example_password) { 'example_password' }

    it 'alters the password digest' do
      expect { subject }.to(change { user.password_digest })
    end
  end

  describe '#password_is?' do
    subject { user.password_is?(example_password) }

    let(:user) { build(:user) }
    let(:example_password) { 'example_password' }

    context 'when set to the example password' do
      let(:user) { build(:user, password: example_password) }

      it { is_expected.to be true }
    end

    it { is_expected.to be false }
  end

  describe '#reset_session_token!' do
    subject(:reset) { user.reset_session_token! }

    let(:user) { create(:user) }

    it 'changes the session token' do
      expect { reset }.to(change { user.session_token })
    end

    it { is_expected.to eq user.session_token }

    context 'when another user exists with the same token' do
      let(:user2) { create(:user) }

      it 'ensures token uniqueness' do
        allow(user).to receive(:new_session_token).and_return(user2.session_token).once

        expect { reset }.to(change { user.session_token })
        expect(user.session_token).not_to eq(user2.session_token)
      end
    end
  end
end

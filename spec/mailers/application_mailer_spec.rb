# frozen_string_literal: true

RSpec.describe ApplicationMailer, type: :mailer do
  it { expect(described_class.default[:from]).to eq "from@example.com" }
  it { expect(described_class.new.action_has_layout?).to be true }
end

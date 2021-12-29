
RSpec.describe ApplicationCable::Connection, type: :channel do
  it "stubs a user agent" do
    connect "/cable"
    expect(connection.request.user_agent).to eq "Rails Testing"
  end
end


RSpec.describe ApplicationCable::Channel, type: :channel do
  it "subscribes without streams" do
    subscribe

    expect(subscription).to be_confirmed
    expect(subscription).not_to have_streams
  end

  it "successfully subscribes" do
    stub_connection anything: 42
    subscribe
    expect(subscription).to be_confirmed
    expect(subscription.anything).to eq 42
  end
end

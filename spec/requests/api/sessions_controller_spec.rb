# frozen_string_literal: true

RSpec.describe Api::SessionsController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }
  let(:user) { create(:user) }

  it "creates a session" do
    post "/api/session", params: { user: { email: user.email, password: user.password } }, headers: headers

    expect(response.body).to match(user.username)
    expect(response.body).not_to match(user.password)
    expect(response.content_type).to include("application/json")
    expect(response).to have_http_status(:ok)
  end

  it "is not authorized to delete without a session" do
    delete "/api/session/", headers: headers

    expect(response.content_type).to include("application/json")
    expect(response).to have_http_status(:unauthorized)
  end

  context "with invalid params" do
    it "creates a session" do
      post "/api/session", params: { user: { email: user.email, password: "bad password" } }, headers: headers

      expect(response.body).not_to match(user.username)
      expect(response.body).not_to match(user.password)
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context "with stubbed login" do
    let(:user) { create(:user) }

    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    it "deletes sessions" do
      delete "/api/session/", headers: headers

      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:ok)
    end
  end

  context "with a real login session" do
    let(:password) { "realpassword1" }
    let(:user) { create(:user, password: password) }

    it "logs in then logs out without stubs (exercises current_user memoisation)" do
      post "/api/session", params: { user: { email: user.email, password: password } }, headers: headers
      expect(response).to have_http_status(:ok)

      delete "/api/session/", headers: headers
      expect(response).to have_http_status(:ok)
    end
  end
end

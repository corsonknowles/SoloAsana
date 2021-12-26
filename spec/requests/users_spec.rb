# frozen_string_literal: true

RSpec.describe Api::UsersController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }

  it "creates a User and renders the JSON show page" do
    post "/api/users", params: { user: { username: "My user", email: "user@example.com", password: "good_example" } },
                       headers: headers

    expect(response.body).to match("My user")
    expect(response.body).not_to match("password")
    expect(response.content_type).to include("application/json")
    expect(response).to have_http_status(:ok)
  end

  context "with invalid params" do
    it "does not create a User and renders errors" do
      post "/api/users", params: { user: { username: "My user", email: "user@example.com", password: "bad" } },
                         headers: headers

      expect(response.body).to match("Password is too short")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  context "with stubbed login" do
    let(:user) { create(:user) }

    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    it "errors on invalid update" do
      put "/api/users/#{user.id}",
          params: { user: { username: "", email: "user@example.com", password: "good_example" } }, headers: headers

      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "accepts valid PATCH updates" do
      patch "/api/users/#{user.id}",
            params: { user: { username: "My Awesome User", email: "user@example.com", password: "good_example" } }, headers: headers

      expect(response.body).to match("My Awesome User")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:ok)
    end

    it "accepts valid PUT updates" do
      put "/api/users/#{user.id}",
          params: { user: { username: "My Awesome User", email: "user@example.com", password: "good_example" } }, headers: headers

      expect(response.body).to match("My Awesome User")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:ok)
    end
  end
end

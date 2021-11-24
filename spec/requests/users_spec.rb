RSpec.describe Api::UsersController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }

  it "creates a User and renders the JSON show page" do
    post "/api/users", params: { user: { username: "My user", email: "user@example.com", password: "good_example"} }, headers: headers

    expect(response.body).to match("My user")
    expect(response.body).not_to match("password")
    expect(response.content_type).to eq("application/json")
    expect(response).to have_http_status(:ok)
  end

  context 'with invalid params' do
    it "does not create a User and renders errors" do
      post "/api/users", params: { user: { username: "My user", email: "user@example.com", password: "bad"} }, headers: headers

      expect(response.body).to match("Password is too short")
      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  context 'with an existing user' do
    let(:user) { create(:user) }
    it "errors on invalid update" do
      patch "/api/users/#{user.id}", params: { user: { username: "", email: "user@example.com", password: "good_example"} }, headers: headers

      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "accepts valid updates" do
      patch "/api/users/#{user.id}", params: { user: { username: "My Awesome User", email: "user@example.com", password: "good_example"} }, headers: headers

      expect(response.body).to match("My Awesome User")
      expect(response.content_type).to eq("application/json")
      expect(response).to have_http_status(:ok)
    end
  end
end

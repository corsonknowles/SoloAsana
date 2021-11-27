RSpec.describe Api::ProjectsController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }
  let(:user) { create(:user) }
  let(:project) { build(:project, user: user) }
  let(:project_params) { project.attributes }

  it "creates a project and renders the JSON show page" do
    post "/api/projects", params: { project: project.attributes }, headers: headers

    expect(response.body).to match(project.name)
    expect(response.content_type).to include("application/json")
    expect(response).to have_http_status(:ok)
  end

  context 'with invalid params' do
    it "does not create a Project and renders errors" do
      post "/api/users", params: { project: { bad_param: "bad"} }, headers: headers

      expect(response.body).to match("hello")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  context 'with a newly created project' do
    let(:user) { create(:user) }
    let(:project) { create(:project, user: user) }

    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    it "errors on invalid update" do
      patch "/api/projects/#{project.id}", params: { project: { bad: "bad example" } }, headers: headers

      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "accepts valid updates" do
      patch "/api/projects/#{project.id}", params: { project: { name: "New and now improved" } }, headers: headers

      expect(response.body).to match("New and now improved")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:ok)
    end
  end
end

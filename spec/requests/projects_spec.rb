RSpec.describe Api::ProjectsController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }
  let(:user) { create(:user) }
  let(:project) { build(:project, user: user) }
  let(:project_params) { project.attributes }

  context 'without a user' do
    it "does not create a Project and renders errors" do
      post "/api/projects", params: { project: project_params }, headers: headers

      expect(response.body).to match("invalid credentials")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'with a user' do
    let(:user) { create(:user) }

    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    context 'with a draft project' do
      it "creates a project and renders the JSON show page" do
        post "/api/projects", params: { project: project_params }, headers: headers

        expect(response.body).to match(project.name)
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      xcontext 'with invalid params' do
        it "does not create a Project and renders errors" do
          post "/api/projects", params: { project: { name: "ALTER USER", bad: "test" } }, headers: headers

          expect(response.body).to match("invalid credentials")
          expect(response.content_type).to include("application/json")
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'with a newly created project' do
      let(:project) { create(:project, user: user) }

      it "errors on invalid update" do
        patch "/api/projects/#{project.id}", params: { project: { user_id: nil, bad: "bad example" } }, headers: headers

        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "accepts valid patch updates" do
        patch "/api/projects/#{project.id}", params: { project: { name: "New and now improved" } }, headers: headers

        expect(response.body).to match("New and now improved")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      it "accepts valid put updates" do
        put "/api/projects/#{project.id}", params: { project: { name: "New and now improved" } }, headers: headers

        expect(response.body).to match("New and now improved")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end
    end
  end
end

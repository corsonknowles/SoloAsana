# frozen_string_literal: true

RSpec.describe Api::ProjectsController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }
  let(:user) { create(:user) }
  let(:project) { build(:project, user: user) }
  let(:project_params) { project.attributes }

  context "without a login" do
    it "does not create a Project and renders errors" do
      post "/api/projects", params: { project: project_params }, headers: headers

      expect(response.body).to match("invalid credentials")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context "with user login stubbed" do
    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    context 'with a task in the database' do
      let!(:project) { create(:project, user: user) }

      it "renders the project show page as JSON" do
        get "/api/projects/#{project.id}", headers: headers

        expect(response.body).to match(project.name)
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end
    end

    context "with multiple projects" do
      let!(:projects) { create_list(:project, 3, user: user) }

      it "renders the projects index as JSON" do
        get "/api/projects", headers: headers

        expect(response.body).to match(projects.first.name)
        expect(response.body).to match(projects.second.name)
        expect(response.body).to match(projects.third.name)
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end
    end

    context "with a draft project" do
      it "creates a project and renders it as JSON" do
        post "/api/projects", params: { project: project_params }, headers: headers

        expect(response.body).to match(project.name)
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      context "with invalid params" do
        let(:project) { build(:project, user: user, name: "*" * 256) }

        it "does not create a Project when the name is too long and renders errors" do
          post "/api/projects", params: { project: project_params }, headers: headers

          expect(response.body).to match("Name is too long")
          expect(response.content_type).to include("application/json")
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "with a newly created project" do
      let(:project) { create(:project, user: user) }

      it "errors on invalid update" do
        put "/api/projects/#{project.id}", params: { project: { user_id: nil } }, headers: headers

        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "accepts valid PATCH updates" do
        patch "/api/projects/#{project.id}", params: { project: { name: "New and now improved" } }, headers: headers

        expect(response.body).to match("New and now improved")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      it "accepts valid PUT updates" do
        put "/api/projects/#{project.id}", params: { project: { name: "New and now improved" } }, headers: headers

        expect(response.body).to match("New and now improved")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      it "can delete" do
        project
        expect do
          delete "/api/projects/#{project.id}", headers: headers

          expect(response.content_type).to include("application/json")
          expect(response).to have_http_status(:ok)
        end.to change(Project, :count).by(-1)
      end
    end
  end
end

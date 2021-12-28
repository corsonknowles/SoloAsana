# frozen_string_literal: true

RSpec.describe Api::TeamsController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }
  let(:user) { create(:user) }
  let(:project) { build(:project, user: user) }
  let(:project_params) { project.attributes }
  let(:team) { build(:team, user: user) }
  let(:team_params) { team.attributes }

  context "without a login" do
    it "does not create a Team and renders errors" do
      post "/api/teams", params: { team: team_params }, headers: headers

      expect(response.body).to match("invalid credentials")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context "with user login stubbed" do
    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    context "with well formed params" do
      it "creates a team and renders it as JSON" do
        post "/api/teams", params: { team: team_params }, headers: headers

        expect(response.body).to match(team.name)
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      context "with invalid params" do
        let(:team) { build(:team, user: user, name: "*" * 256) }

        it "does not create a Team when the name is too long and renders errors" do
          post "/api/teams", params: { team: team_params }, headers: headers

          expect(response.body).to match("Name is too long")
          expect(response.content_type).to include("application/json")
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "with a newly created team" do
      let(:team) { create(:team, user: user) }

      it "errors on invalid update" do
        put "/api/teams/#{team.id}", params: { team: { user_id: nil } }, headers: headers

        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "accepts valid PATCH updates" do
        patch "/api/teams/#{team.id}", params: { team: { name: "New and now improved" } }, headers: headers

        expect(response.body).to match("New and now improved")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      it "accepts valid PUT updates" do
        put "/api/teams/#{team.id}", params: { team: { name: "New and now improved" } }, headers: headers

        expect(response.body).to match("New and now improved")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      it "can delete" do
        team
        expect do
          delete "/api/teams/#{team.id}", headers: headers

          expect(response.content_type).to include("application/json")
          expect(response).to have_http_status(:ok)
        end.to change { Team.count }.by(-1)
      end
    end
  end
end

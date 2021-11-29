RSpec.describe Api::TasksController, type: :request do
  let(:headers) { { "ACCEPT" => "application/json" } }
  let(:user) { create(:user) }
  let(:project) { create(:project, user: user) }
  let(:task) { build(:task, user: user, project: project) }
  let(:task_params) { task.attributes }

  context 'without a login' do
    it "does not create a Task and renders errors" do
      post "/api/tasks", params: { task: task_params }, headers: headers

      expect(response.body).to match("invalid credentials")
      expect(response.content_type).to include("application/json")
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'with user login stubbed' do
    before do
      allow_any_instance_of(described_class).to receive(:current_user).and_return(user)
    end

    context 'with a draft task' do
      it "creates a task and renders it as JSON" do
        post "/api/tasks", params: { task: task_params }, headers: headers

        expect(response.body).to match(task.title)
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      context 'with invalid params' do
        it "does not create a Task and renders errors" do
          post "/api/tasks", params: { task: task_params.to_h.merge!(project_id: nil) }, headers: headers

          expect(response.body).to match("Project must exist")
          expect(response.content_type).to include("application/json")
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'with a newly created project' do
      let(:task) { create(:task, user: user, project: project) }

      it "errors on invalid update" do
        patch "/api/tasks/#{task.id}", params: { task: { user_id: nil } }, headers: headers

        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "accepts valid patch updates" do
        patch "/api/tasks/#{task.id}", params: { task: { title: "Better task" } }, headers: headers

        expect(response.body).to match("Better task")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end

      it "accepts valid put updates" do
        put "/api/tasks/#{task.id}", params: { task: { title: "Better task" } }, headers: headers

        expect(response.body).to match("Better task")
        expect(response.content_type).to include("application/json")
        expect(response).to have_http_status(:ok)
      end
    end
  end
end

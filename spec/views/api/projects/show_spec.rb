# frozen_string_literal: true

RSpec.describe Project, type: :view do
  let(:project) { build(:project) }

  it "renders project json" do
    render partial: "api/projects/project.json.jbuilder", locals: { project: project }

    project_hash = JSON.parse(rendered)

    expect(project_hash["id"]).to eq(project.id)
    expect(project_hash["user_id"]).to eq(project.user_id)
    expect(project_hash["name"]).to eq(project.name)
    expect(project_hash["team_id"]).to eq(project.team_id)
  end
end

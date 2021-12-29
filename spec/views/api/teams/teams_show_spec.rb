# frozen_string_literal: true

RSpec.describe Team, type: :view do
  let(:team) { build(:team) }

  it "renders team json" do
    render partial: "api/teams/team",
           formats: [:json],
           locals: { team: team }

    team_hash = JSON.parse(rendered)

    expect(team_hash["id"]).to eq(team.id)
    expect(team_hash["user_id"]).to eq(team.user_id)
    expect(team_hash["name"]).to eq(team.name)
    expect(team_hash["created_at"]).to eq(team.created_at)
    expect(team_hash["updated_at"]).to eq(team.updated_at)
  end
end

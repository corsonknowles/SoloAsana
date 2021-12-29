# frozen_string_literal: true

RSpec.describe Task, type: :view do
  let(:task) { build(:task) }

  it "renders task json" do
    render partial: "api/tasks/task",
           formats: [:json],
           locals: { task: task }

    task_hash = JSON.parse(rendered)

    expect(task_hash["id"]).to eq(task.id)
    expect(task_hash["user_id"]).to eq(task.user_id)
    expect(task_hash["project_id"]).to eq(task.project_id)
    expect(task_hash["team_id"]).to eq(task.team_id)
    expect(task_hash["body"]).to eq(task.body)
    expect(task_hash["done"]).to eq(task.done)
    expect(task_hash["due"]).to eq(task.due)
    expect(task_hash["section"]).to eq(task.section)
    expect(task_hash["title"]).to eq(task.title)
  end
end

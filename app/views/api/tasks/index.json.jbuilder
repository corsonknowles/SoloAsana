# frozen_string_literal: true

current_user.projects.each do |project|
  project.tasks.each do |task|
    json.set! task.id do
      json.extract! task, :title, :id, :body, :due, :done, :user_id, :project_id, :team_id, :section, :task_id
    end
  end
end

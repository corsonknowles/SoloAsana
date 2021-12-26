# frozen_string_literal: true

current_user.projects.tasks.each do |task|
  json.set! task.id do
    json.partial! "api/projects/project", locals: { project: project }, as: :project
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.create(username: "Awesome User", email: "awesome.user@example.com")

Team.destroy_all
Project.destroy_all
Task.destroy_all

Team.create!(name: "The A Team", user_id: 1)
Project.create!(name: "It's alive!", team_id: 1, user_id: 1)
Project.create!(name: "This is amazing!", team_id: 1, user_id: 1)
Project.create!(name: "Project 3 is the Charm", team_id: 1, user_id: 1)
Task.create!(title: "Test the test-making test tasks", body: "Not all who wander", done: false, user_id: 1, project_id: 1, team_id: 1, section: false)

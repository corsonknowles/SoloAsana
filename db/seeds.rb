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
User.destroy_all

myUser = User.create!(email: "awesome.user@example.com", username:"Awesome User", password: "secure")

t1 = Team.create!(name: "The A Team", user_id: myUser.id)



p1 = Project.create!(name: "It's alive!", team_id: t1.id, user_id: myUser.id)
p2 = Project.create!(name: "This is amazing!", team_id: t1.id, user_id: myUser.id)
p3 = Project.create!(name: "Project 3 is the Charm", team_id: t1.id, user_id: myUser.id)

task1 = Task.create!(title: "Test the test-making test tasks", body: "Not all who wander", done: false, user_id: myUser.id, project_id: p1.id, team_id: t1.id, section: false)
task2 = Task.create!(title: "Test the test-making test tasks", body: "Not all who wander", done: false, user_id: myUser.id, project_id: p2.id, team_id: t1.id, section: false)
task3 = Task.create!(title: "Test the test-making test tasks", body: "Not all who wander", done: false, user_id: myUser.id, project_id: p3.id, team_id: t1.id, section: false)

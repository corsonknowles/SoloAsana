# frozen_string_literal: true

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

default_user = User.create!(email: "awesome.user@example.com", username: "Robert", password: "secure", photo: "https://res.cloudinary.com/cloudfunded/image/upload/v1501203375/hetwrlqq3rw3udsygkat.jpg")
team_one = Team.create!(name: "The A Team", user_id: default_user.id)

project_one = Project.create!(name: "San Francisco Daily Life", team_id: team_one.id, user_id: default_user.id)
task1 = Task.create!(title: "Walk my best friend's corgi in Golden Gate Park", body: "", done: false,
                     user_id: default_user.id, project_id: project_one.id, team_id: team_one.id, section: false)
task2 = Task.create!(title: "Pick up lunch from MealPal", body: "", done: false, user_id: default_user.id,
                     project_id: project_one.id, team_id: team_one.id, section: false)
task3 = Task.create!(title: "LYFT to the MoMA", body: "", done: false, user_id: default_user.id,
                     project_id: project_one.id, team_id: team_one.id, section: false)
task4 = Task.create!(title: "Kitesurf in the bay. Fall over. Get back up again. Fall over.", body: "", done: false,
                     user_id: default_user.id, project_id: project_one.id, team_id: team_one.id, section: false)
compare_icecream = "Debate whether Humphry Slocombe or BiRite Creamery is superior. With the engineer who made the N02 ice cream at Smitten."
task5 = Task.create!(title: compare_icecream, body: "", done: false, user_id: default_user.id,
                     project_id: project_one.id, team_id: team_one.id, section: false)
task6 = Task.create!(title: "Acquire some hipster chique threads that are not too hipster and not too chique",
                     body: "", done: false, user_id: default_user.id, project_id: project_one.id, team_id: team_one.id, section: false)

project_two = Project.create!(name: "Programmer Humor", team_id: team_one.id, user_id: default_user.id)
task21 = Task.create!(title: "Browse XKCD.com", body: "", done: false, user_id: default_user.id,
                      project_id: project_two.id, team_id: team_one.id, section: false)
regex_wisdom = "Some people, when confronted with a problem, think 'I know, I'll use regular expressions.' Now they have two problems! - Jamie Zawinski"
task22 = Task.create!(title: regex_wisdom, body: "", done: false, user_id: default_user.id, project_id: project_two.id,
                      team_id: team_one.id, section: false)
cache_names = "‘There are only two hard things in Computer Science: cache invalidation and naming things.’
- Phil Karlton"
task23 = Task.create!(title: cache_names, body: "", done: false, user_id: default_user.id, project_id: project_two.id,
                      team_id: team_one.id, section: false)
task24 = Task.create!(title: "Meta-joke about how hard item 4 was to name. </grin> ", body: "", done: false,
                      user_id: default_user.id, project_id: project_two.id, team_id: team_one.id, section: false)

project_three = Project.create!(name: "Recruitment To Do List", team_id: team_one.id, user_id: default_user.id)
task31 = Task.create!(title: "Interview David Corson-Knowles", body: "", done: false, user_id: default_user.id,
                      project_id: project_three.id, team_id: team_one.id, section: false)
task32 = Task.create!(title: "Recommend David Corson-Knowles", body: "", done: false, user_id: default_user.id,
                      project_id: project_three.id, team_id: team_one.id, section: false)
task33 = Task.create!(title: "Hire David Corson-Knowles", body: "", done: false, user_id: default_user.id,
                      project_id: project_three.id, team_id: team_one.id, section: false)

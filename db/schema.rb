# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_08_131225) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "projects", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.string "name"
    t.bigint "team_id"
    t.datetime "updated_at", precision: nil, null: false
    t.bigint "user_id"
    t.index ["team_id"], name: "index_projects_on_team_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", precision: nil, null: false
    t.boolean "done", default: false, null: false
    t.integer "due"
    t.bigint "project_id"
    t.boolean "section", default: false, null: false
    t.bigint "task_id"
    t.bigint "team_id"
    t.string "title"
    t.datetime "updated_at", precision: nil, null: false
    t.bigint "user_id"
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["task_id"], name: "index_tasks_on_task_id"
    t.index ["team_id"], name: "index_tasks_on_team_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.string "name"
    t.datetime "updated_at", precision: nil, null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "about"
    t.datetime "created_at", precision: nil, null: false
    t.string "department"
    t.string "email", null: false
    t.integer "latest_project"
    t.string "password_digest", null: false
    t.string "photo"
    t.string "role"
    t.string "session_token"
    t.datetime "updated_at", precision: nil, null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end
end

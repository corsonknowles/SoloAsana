# Database Schema

create_table "tasks", force: :cascade do |t|
  t.string "title"
  t.text "body"
  t.integer "due"
  t.boolean "done"
  t.bigint "user_id"
  t.boolean "section"
  t.bigint "task_id"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["task_id"], name: "index_tasks_on_task_id"
  t.index ["user_id"], name: "index_tasks_on_user_id"
end

create_table "users", force: :cascade do |t|
  t.string "username"
  t.string "password_digest"
  t.string "session_token"
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end

add_foreign_key "tasks", "tasks"
add_foreign_key "tasks", "users"
end

# Model and Controllers
rails g model Task title:string body:text due:integer done:boolean user:references section:boolean task:references
rails g model User username:string password_digest:string session_token:string
rails g controller Users new create
rails g controller Sessions new create destroy

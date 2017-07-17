# Database Schema

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    |
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## tasks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    |
body        | string    |
user_id     | bigint    | not null, foreign key, references users, indexed
project_id  | bigint    | not null, foreign key references projects, indexed
done        | boolean   | not null, default: false
section     | boolean   | not null, default: false
due         | integer   |

## projects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
name        | string    | not null



### Model and Controllers
        rails g model Task title:string body:text due:integer done:boolean user:references section:boolean task:references
        rails g model User username:string password_digest:string session_token:string
        rails g controller Users new create
        rails g controller Sessions new create destroy

        #### Example Models
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
          t.string "email", null: false
          t.datetime "created_at", null: false
          t.datetime "updated_at", null: false
          t.index ["email"], name: "index_users_on_email", unique: true
        end

        add_foreign_key "tasks", "tasks"
        add_foreign_key "tasks", "users"
        end

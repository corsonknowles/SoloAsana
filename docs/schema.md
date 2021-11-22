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
team_id     | integer   | not null, foreign key (references teams), indexed
name        | string    | not null

## teams
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
name        | string    | not null



### Model and Controllers
        User first:
        rails g model User username:string email:string password_digest:string session_token:string

        rails g model Team name:string user:references

        rails g model Project name:string team:references user:references

        rails g model Task title:string body:text due:integer done:boolean user:references project:references team:references section:boolean task:references

        rails g controller Users new create
        rails g controller Sessions new create destroy
        rails g controller Task new create update destroy

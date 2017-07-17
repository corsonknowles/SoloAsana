# Database Schema

schema.md
Link to a document outlining the database schema for your app. Build up the schema by walking through your app's wireframes. Think carefully about what data will be needed for each view and the best way to store that data. Make note of any database-level validations and foreign key relationships.



# Model and Controllers
rails g model Task title:string body:text due:integer done:boolean user:references section:boolean task:references
rails g model User username:string password_digest:string session_token:string
rails g controller Users new create
rails g controller Sessions new create destroy

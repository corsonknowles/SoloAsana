# SoloAsana
Stretch yourself to complete all your tasks!

# Wireframes

# Key Feature Description
Tasks (
  enter to complete
  done: fades
  )
Task Details (
  Description
  Change Log
  )
Due Date
Drag and Drop

# Development Timeline

Phase 1: React Authentication Built on Top of Rails (2 Days)

Fully stylized login/signup combined form. New account creation with Guest Login.
BONUS: OAuth for Google Signin

Phase 2: Database Model and React Components (2 Days)
Create the data structures that the site will be made out of.

Phase 3: Tasks Main View (2 Days)
Tasks can be created, edited, deleted and marked as done or undone.
Key feature: Enter key creates new tasks .
BONUS: Adding a ':' makes a task into a Section heading instead
BONUS: Tasks can be dragged and dropped.
BONUS ***** Keyboard shortcuts

Phase 3: Tasks Detail View (4 Days)
On click, render new component that splits the screen with Task Main View.
Detail view allows adding additional information to task.
Detail view can specify a due date.
BONUS: Change section heading of task
BONUS: Add Project label to task. Sort by Project Label.

Phase 4: Cleanup and Seeding of Data (2 days)
Demo view

Total: 12 Work Days.


The following files, which should be linked to in the Development README:

* api-endpoints.md
* component-hierarchy.md
* sample-state.md
* schema.md
* Create a docs folder to hold wireframe images.

Domain: soloasana.com

# Minimum Viable Product

SoloAsana is a tribute to the amazing task management platform Asana. It provides a complete personal task management system, including tasks with due dates and the amazing interface that makes Asana great (hit Enter to submit task and start a new one, use Keyboard shortcuts, drag and drop).


# Wireframes

Login
Main Task View
Detail Task View
See Docs Folder for Balsamiq files and PNGs.

# React Components

component-hierarchy.md
App
LoginContainer

LoginForm

HeaderContainer
  LogoutContainer

Profile Modal
  Settings (Modal)
  User (Modal)
  (NB: Logout goes in here)

DetailContainer
  DueDate
  Details

TaskContainer
  TaskList

Errors

BONUS:
LeftNavContainer
  ProjectsNav


Indicate what state and dispatch props each component uses.
For presentational components, indicate the props and state they will use.
Map React Routes with their respective components and paths.


# Sample State

sample-state.md

Using normalized state shape, organized to minimize duplication and maximize ease of access:

{
    tasks : {
        byId : {
            "task1" : {
                id : "task1",
                user : "user1",
                details : "......",
                due-date: integer date object,
                done: boolean
            },
            "task2" : {
                id : "task2",
                user : "user2",
                body : "......",
                due-date: integer date object,
                done: boolean  
            }
        }
        allIds : ["task1", "task2"]
    },

    sections : {

    }

    projects : {

    }



DB Schema

schema.md
Link to a document outlining the database schema for your app. Build up the schema by walking through your app's wireframes. Think carefully about what data will be needed for each view and the best way to store that data. Make note of any database-level validations and foreign key relationships.

# Model and Controllers
rails g model Task title:string body:text due:integer done:boolean user:references section:boolean task:references
rails g model User username:string password_digest:string session_token:string
rails g controller Users new create
rails g controller Sessions new create destroy


# API Endpoints

api-endpoints.md
Rails API endpoints.
Only JSON endpoints, except for Root.
Params for each endpoint, and what information will be returned.

HTML ENDPOINT

Root
GET / - Rendering Screen

JSON ENDPOINTS

Users
POST /api/users
GET /api/users/:id
PATCH /api/users/:id

Session
POST /api/session
DELETE /api/session

Tasks

GET /api/tasks
POST /api/tasks
GET /api/tasks/:id
DELETE /api/tasks/:id

BONUS:
Projects
GET /api/projects
POST /api/projects
GET /api/projects/:id
PATCH /api/projects/:id
DELETE /api/projects/:id
GET /api/projects/:id/tasks


# Even More Bonuses:
Tab to move
Attachments
Sections & corresponding Section selector in detail view (
  create section by adding Colon ':' at end of task
  )
Import Loading Screen: https://github.com/needim/wdtLoading
Calendar
Self comments (annotations)
Keyboard shortcut walkthrough

Submission

When you've finished setting up your full-stack project repo, create your Trello board, add your project to Progress Tracker and email your Project Manager (instructors-sf@appacademy.io or instructors-ny@appacademy.io). A TA will review each proposal and leave their comments in issues on the project repo. Be prepared to respond to feedback, and keep your README up to date as you make progress. Happy hunting!

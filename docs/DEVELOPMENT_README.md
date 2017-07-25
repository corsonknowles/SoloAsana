# SoloAsana
Stretch yourself to complete all your tasks!

# Technology Description
SoloAsana is a rapid deployment personal project, built in less than two weeks, powered by a Rails 5.1 backend with API endpoints.
SoloAsana delivers a React.js frontend with a Redux framework.
The database fueling all this is PostgreSQL.

### [Domain: soloasana.com](http://soloasana.com)
### [Trello Board](https://trello.com/b/6awTqKyy/soloasana-board)

# Key Feature Description
* Tasks
  - enter to complete
  - backspace fully to delete
  - click done: task fades
  - blank tasks persist until removed
* Task Details
  - Description
  - Change Log - username, string interpolation, timestamp.
* Due Date
* Drag and Drop

# Development Timeline

Phase 1: React Authentication Built on Top of Rails (2 Days)

  - Fully stylized login/signup combined form.
  - New account creation and login / logout on back and front end
  - Demo view
  - BONUS: OAuth for Google Signin

Phase 2: Profiles (1 Day)
  - Per user

Phase 3: Tasks Main View (4 Days)
  - Tasks can be created, edited, deleted and marked as done or not done
  - Key feature: Enter key creates new tasks
  - On click, render new component that splits the screen with Task Main View
  - Detail view allows adding additional information to task
  - Detail view can specify a due date
  - Add Project label to task. Sort by Project Label

  - BONUS: Change section heading of task
  - BONUS: Adding a ':' makes a task into a Section heading instead
  - BONUS: Tasks can be dragged and dropped.
  - BONUS: Keyboard shortcuts

Phase 4: Projects (1 Day)
  - Reload task list, organized by project
  - Has Many and Belongs to Database relationships

Phase 5: Comments & Calendar & Teams (0.5 Day)
  - Team selection works like Project selection

Phase 6: Seed Database (0.5 Days)

Total: 9 Work Days.


Enclosed in the docs folder:

* [Wireframes](./Wireframes)
* [React Components](component-hierarchy.md)
* [API Endpoints](api-endpoints.md)
* [DB Schema](schema.md)
* [Sample State](sample-state.md)


# Minimum Viable Product

SoloAsana is dedicated to the amazing task management platform Asana.
The MVP features for this 9 day project are:
* Heroku Hosting
* User Authentication
* User Profile
* Tasks
* Projects
* Teams
* Production README

# Even More Bonuses:

* Enter to create new task
* Delete to destroy empty task
* Tab to move
* User uploads: File Attachments
* User comments
* Sections & corresponding Section selector in detail view
  - create section by adding Colon ':' at end of task
* Import Loading Screen: [Existing Library] (https://github.com/needim/wdtLoading)
* Calendar
* Keyboard shortcut walkthrough

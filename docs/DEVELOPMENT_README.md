# SoloAsana
Stretch yourself to complete all your tasks!

# Technology Description
SoloAsana is a rapid deployment personal project, built in less than two weeks, powered by a Rails 5.1 backend with API endpoints.
SoloAsana delivers a React.js frontend with a Redux framework.
The database fueling all this is PostgreSQL.

### Domain: soloasana.com
### Trello Board: https://trello.com/b/6awTqKyy/soloasana-board

# Key Feature Description
* Tasks (
  - enter to complete
  - backspace fully to delete
  - click done: task fades
  - blank tasks persist until removed
  )
* Task Details (
  - Description
  - Change Log - username, string interpolation, timestamp.
  )
* Due Date
* Drag and Drop

# Development Timeline

Phase 1: React Authentication Built on Top of Rails (2 Days)

- Fully stylized login/signup combined form. New account - creation with Guest Login.
- BONUS: OAuth for Google Signin

Phase 2: Database Model and React Components (2 Days)
- Create the data structures that the site will be made out of.

Phase 3: Tasks Main View (2 Days)
- Tasks can be created, edited, deleted and marked as done or undone.
- Key feature: Enter key creates new tasks .
- BONUS: Adding a ':' makes a task into a Section heading instead
- BONUS: Tasks can be dragged and dropped.
- BONUS ***** Keyboard shortcuts

Phase 4: Tasks Detail View (4 Days)
  - On click, render new component that splits the screen with Task Main View.
  - Detail view allows adding additional information to task.
  - Detail view can specify a due date.
  - BONUS: Change section heading of task
  - BONUS: Add Project label to task. Sort by Project Label.

Phase 5: Cleanup and Seeding of Data (2 days)
- Demo view

Total: 12 Work Days.


Enclosed in the docs folder:

* [BalsamiqWireframes](./BalsamiqWireframes)
* [ImageWireframes](./ImageWireframes)
* [React Components](component-hierarchy.md)
* [API Endpoints](api-endpoints.md)
* [DB Schema](schema.md)
* [Sample State](sample-state.md)


# Wireframe List

Login

Main Task View

Detail Task View

See Docs Folder for Balsamiq files and PNGs.


# Minimum Viable Product

SoloAsana is a rapid development personal project, dedicated to the amazing task management platform Asana. It provides a complete individualized task management system, including items with due dates and the useful interface that makes Asana great (hit Enter to submit task and start a new one, use Keyboard shortcuts, drag and drop).

# Even More Bonuses:
Tab to move

Attachments

Sections & corresponding Section selector in detail view (
  create section by adding Colon ':' at end of task
  )

Import Loading Screen: [Existing Library] (https://github.com/needim/wdtLoading)

Calendar

Self comments (annotations)

Keyboard shortcut walkthrough

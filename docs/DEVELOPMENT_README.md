# SoloAsana
Stretch yourself to complete all your tasks!

Bonuses:
Sections & corresponding Section selector in detail view (
  create section by adding Colon ':' at end of task
  )
Import Loading Screen: https://github.com/needim/wdtLoading
Attachments
Calendar
Self comments (annotations)
Keyboard shortcuts
Tab to move

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

Phase 1: React Authentication Built on Top of Rails (2 days)

Fully stylized login/signup combined form. New account creation with Guest Login.
BONUS: OAuth for Google Signin

Phase 2: Tasks Main View (4 days)
Tasks can be created, edited, deleted and marked as done or undone.
Key feature: Enter key creates new tasks .
BONUS: Adding a ':' makes a task into a Section heading instead
BONUS: Tasks can be dragged and dropped.
BONUS ***** Keyboard shortcuts

Phase 3: Tasks Detail View (4 days)
On click, render new component that splits the screen with Task Main View.
Detail view allows adding additional information to task.
Detail view can specify a due date.
BONUS: Change section heading of task
BONUS: Add Project label to task. Sort by Project Label.

Phase 4: Cleanup and Seeding of Data (2 days)
Demo view


The following files, which should be linked to in the Development README:

* api-endpoints.md
* component-hierarchy.md
* sample-state.md
* schema.md
* Create a docs/wireframes folder to hold wireframe images.

Domain: soloasana.com

Minimum Viable Product

SoloAsana is a tribute to the amazing task management platform Asana. It provides a complete personal task management system, including tasks with due dates and the amazing interface that makes Asana great (hit Enter to submit task and start a new one, use Keyboard shortcuts, drag and drop).


# Wireframes

Login
Main Task View
Detail Task View


# React Components

component-hierarchy.md
In addition to the wireframes, you should diagram a tree indicating your application's overall component structure.

Discuss how you will nest your components. If components will need containers, indicate what state and dispatch props they will need. For presentational components, discuss what props and state they will need.

Map out your React Routes with their respective components and paths.

See the sample project proposal for an example of this.

Sample State

sample-state.md
Create a basic illustration of your state shape. Think about what information you need to store for your app to work, and how best to organize it to minimize duplication and maximize ease of access.

DB Schema

schema.md
Link to a document outlining the database schema for your app. Build up the schema by walking through your app's wireframes. Think carefully about what data will be needed for each view and the best way to store that data. Make note of any database-level validations and foreign key relationships.

API Endpoints

api-endpoints.md
Link to a page that lists your Rails API endpoints. Break these up between HTML and JSON endpoints. Discuss what params, if any, will be needed for each endpoint, and what information will be returned.

Implementation Timeline

Create a section in your proposal README for each phase of your project to develop an implementation timeline.

Refer back to your MVP and group the features into logical phases. Rather than building the entire project all at once, you're going to implement one feature at a time. You should have a working app at the end of each phase (even if not all of your features are in yet).

This is crucial both here and in the industry. The truth is, one never knows how long implementing any particular phase will take. Constraints change. Timelines are shortened without warning. An app after any phase must be able to stand on it's on. We call this building in 'slices' instead of 'layers'.

Submission

When you've finished setting up your full-stack project repo, create your Trello board, add your project to Progress Tracker and email your Project Manager (instructors-sf@appacademy.io or instructors-ny@appacademy.io). A TA will review each proposal and leave their comments in issues on the project repo. Be prepared to respond to feedback, and keep your README up to date as you make progress. Happy hunting!

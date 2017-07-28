# README

Cool features to discuss:

* The power of Redux stateless forms
* Auth routes
* React style key listeners


# SoloAsana

[SoloAsana live](http://soloasana.com)

[heroku]: http://soloasana.herokuapp.com

SoloAsana is a rapid deployment personal project, built in less than two weeks, powered by a Rails 5.1 backend with API endpoints.
SoloAsana delivers a React.js frontend using the Redux framework.
The database fueling all this is PostgreSQL.

## Major Features

* Tasks
  - Hitting enter adds a new task to the end of the task list
  - Backspacing a task fully will delete an empty task
  - Blank tasks will persist until removed
* Projects
  - SoloAsana has editable and creatable projects
  - Each project renders a list of associated tasks
  - This feature extends the best part of the Asana-style user interface, allowing easy editing,  addition, and deletion of projects without leaving the main page
* User profiles
  - The user profile permits photo uploading
  - This is rendered through an awesome modal-within-a-modal interface, that loads seamlessly for the user
  - Each user profile has editable description fields that save only on submit


### How It Works

  SoloAsana provides an easy way to get started with a DEMO login feature. The demo login auto-completes the auth form and logs the guest user directly into the site.

  Once inside, the user has access to their profile in the top right corner and an editable list of projects along the right hand side. This project list also serves as a navigation tool, selecting any list will render the associated tasks and allow the user to add, edit and delete tasks from the list.

### Cool Tech Included Within

#### Removing Overdragging and Bounce effects from OSX
These simple lines of CSS allow SoloAsana to render as fixed site within the browser window. While the bounce effect that occurs when you overscroll a site in an OSX browser is generally a pleasing user interaction, in a content rich task editing application like Solo, it's merely a distraction. Creating a fixed page allows the user to focus on the tasks at hand, pun fully intended. This is one of the most clean and elegant ways to implement this fixed page rendering that Asana also employs.

'''
html {
    overflow: hidden;
    height: 100%;
}

body {
    height: 100%;
    overflow: auto;
}
'''




## Onwards to the Future!

Solo is already a fully functional to-do list. But since it was so enjoyable to build, I'm excited about future directions for the project. These are the feature additions that I am considering exploring in the near future.

### Drag and Drop

Allow a user to pick up and drop tasks or projects to reposition them and order them to suit their needs.

### User comments

This will permit users to comment on tasks. The user profile photos can render next to comments to make it easy to visually track contributors to the conversation.

### File Attachments

File attachments can be allowed in a manner very similar to the interface for click-to-select file and drag-to-upload that users enjoy on the profile screen for image uploading. Allowing file attachment to tasks is a nice future direction that will lend additional versatility to the clean interface of the app.

See the [Development README](./docs/DEVELOPMENT_README.md)

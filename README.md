# README

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


## How It Works

  SoloAsana provides an easy way to get started with a DEMO login feature. The demo login auto-completes the auth form and logs the guest user directly into the site.

  Once inside, the user has access to their profile in the top right corner and an editable list of projects along the right hand side. This project list also serves as a navigation tool, selecting any list will render the associated tasks and allow the user to add, edit and delete tasks from the list.

## Cool Tech Included Within

### Slick CSS: Removing Overdragging and Bounce effects from OSX
These simple lines of CSS allow SoloAsana to render as fixed site within the browser window. While the bounce effect that occurs when you overscroll a site in an OSX browser is generally a pleasing user interaction, in a content rich task editing application like Solo, it's merely a distraction. Creating a fixed page allows the user to focus on the tasks at hand, pun fully intended. This is one of the most clean and elegant ways to implement this fixed page rendering that Asana also employs.

```
html {
    overflow: hidden;
    height: 100%;
}

body {
    height: 100%;
    overflow: auto;
}
```


### Rockin Javascript (ES6)

I used React's synthetic event handlers to allow custom behavior for the enter and delete keys and the up and down arrows. Let's look at a detailed example.
This code allows you to move up and down a list of tasks, without generating any errors at the beginning or end of the list where there is no where to move to. It overwrites the normal behavior of the up and down arrows. Instead of going to the beginning or end of a line of text, they will take the user to the next item in the list, making the To Do editor much more like a text editor in the browser.
```
// look up the potential next item in the list, then only if it exists, focus on and select that element.
...
} else if (event.key === 'ArrowDown' || event.keyCode === 40) {
  event.preventDefault();
  let itemBelow = document.getElementById(`task${String(parseInt(i) + 1)}`);
  if (itemBelow) {
    itemBelow.focus();
    itemBelow.select();
  }

// add an iterator (i) to the map function to create unique ID's
// since there are multiple lists on the page, use a naming convention which will not create any overlap with the id's from other lists
render () {
  <div className="tasks-list">
    {Object.keys(this.props.tasks).map( (taskNumber, i) => (
        <input
        id={`task${i}`}
        defaultValue={this.props.projects[projectID].name}

        ...
        />
    )
  )}  
}
```

Movement between projects was handled similarly, using a different set of unique ID's. This also shows how easy it is to iterate through a plain old javascript object to render values to HTML fields in React. Because hash lookup is so fast O(1), this can be on par or faster than retrieving the data in array from the database or transforming it before rendering. 

### Showing off HTML5 for Better User Experience

Solo allows the user to both edit a project by selecting it and navigate to the enclosed tasks for that project at the same time. I accomplished this by simply wrapping the React NavLinks around customized input fields. In order to preserve the standard flow of user navigation with the Tab key to switch between fields, I set:
```
tabIndex="-1"
```

which is the React version of the HTML5 tabindex attribute. This skips over the enclosing links and lets the cursor arrive at the next input field, as would generally be expected.

### And more from React and Redux!
Here are a few other features I enjoyed:

* React Controlled Forms: allowing rapid updating between the database and the user, allowing for rapid saving of each new character as its entered
* Authenticated routes: taking the one-page-app to its logical conclusion, this renders just a logged out page and a logged in page. Once the user is logged in, all the content of the app can be served to them from one page using conditionally rendered React Components which appear and disappear based on the route showing in the URL -- no new page load or refresh is ever required, as content arrives and departs from the page as it's called for.
* React style key listeners: The up and down arrows weren't the only user inputs to get custom styling. The enter key was also attached to the React event listener onKeyDown, allowing it to create a new task on demand for the user. The delete key was similarly enhanced. Wrapping it in a little logic to detect an empty input field, it will only delete a field from the interface (and the database, simultaneously) when all of the content has first been removed from that field. Hit delete again on an empty field and it all goes away.

## Onwards to the Future!

Solo is already a fully functional to-do list. But since it was so enjoyable to build, I'm excited about future directions for the project. These are the feature additions that I am considering exploring in the near future.

### Drag and Drop

Allow a user to pick up and drop tasks or projects to reposition them and order them to suit their needs.

### User comments

This will permit users to comment on tasks. The user profile photos can render next to comments to make it easy to visually track contributors to the conversation.

### File Attachments

File attachments can be allowed in a manner very similar to the interface for click-to-select file and drag-to-upload that users enjoy on the profile screen for image uploading. Allowing file attachment to tasks is a nice future direction that will lend additional versatility to the clean interface of the app.

See the [Development README](./docs/DEVELOPMENT_README.md)

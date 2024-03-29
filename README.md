# README
![example workflow](https://github.com/corsonknowles/SoloAsana/actions/workflows/rails.yml/badge.svg)
![example workflow](https://github.com/corsonknowles/SoloAsana/actions/workflows/rubocop.yml/badge.svg)
<a href="https://codeclimate.com/github/corsonknowles/SoloAsana/test_coverage"><img src="https://api.codeclimate.com/v1/badges/da6c32130bf13fc96f1a/test_coverage" /></a>


# SoloAsana

[SoloAsana live](http://soloasana.com)

[heroku]: http://soloasana.herokuapp.com

SoloAsana is a lean, sleek task management app.
It began as a rapid deployment personal project, built in less than two weeks, powered by a modern Rails backend with API endpoints.
SoloAsana delivers a React.js frontend using the Redux framework.
The database fueling all this is PostgreSQL.

![Solo Home Page](docs/Screenshots/Solo_Home_Page.png)

## Major Features

* Tasks
  - Hitting enter adds a new task to the end of the task list
  - Backspacing a task fully will delete an empty task
  - Blank tasks will persist until removed
* Projects
  - SoloAsana has editable and creatable projects
  - Each project renders a list of associated tasks
  - This feature extends the best part of the Asana-style user interface, allowing easy editing, addition, and deletion of projects without leaving the main page
* User profiles
  - The user profile permits photo uploading
  - This is rendered through an awesome modal-within-a-modal interface, that loads seamlessly for the user
    - UI touches: The inner modal's closing X button is offset from the outer modal, to prevent unexpected behavior and double-clicking. The modals also close, one at a time, when the user clicks the page to return to it.
  - Each user profile has editable description fields that save only on submit

![Solo Profile Page](docs/Screenshots/Solo_Profile_Page.png)

## How It Works

  SoloAsana provides an easy way to get started with a DEMO login feature. The demo login auto-completes the secure authentication form and logs the guest user directly into the site.

  Once inside, the user has access to their profile in the top right corner and an editable list of projects with their included tasks.

  The project list also serves as a navigation tool. Selecting any list will render the associated tasks and allow the user to add, edit, and delete tasks from the list.

## Cool Tech Included Within

![Solo Demo Account](docs/Screenshots/Demo_Login.gif)

### Slick CSS: Removing the Overdragging and Bounce effects from OSX
These simple lines of CSS allow SoloAsana to render as a fixed site within the browser window. While the bounce effect that occurs when you over-scroll a site in an OSX browser is generally a pleasing user interaction, in a content rich task editing application like Solo, it's merely a distraction. Creating a fixed page allows the user to focus on the tasks at hand, pun fully intended. This is one of the most clean and elegant ways to implement this fixed page rendering.

```CSS
html {
    overflow: hidden;
    height: 100%;
}

body {
    height: 100%;
    overflow: auto;
}
```


### Rockin JavaScript (ES6)

I used React's synthetic event handlers to allow custom behavior for the enter and delete keys and the up and down arrows. Let's look at a detailed example.
This code allows you to move up and down a list of tasks. It is logic gated to prevent generating any errors at the beginning or end of the list, when there would be no place to move the cursor to. This snippet overwrites the normal behavior of the up and down arrows. Instead of going to the beginning or end of a line of text, these keys will now take the user to the next item in the list. These effects make the To Do editor much more like a text editor in the browser.
```JavaScript
// look up the potential next item in the list
// then only if it exists, focus on that element.
if (event.key === 'ArrowDown' || event.keyCode === 40) {
  event.preventDefault();
  const itemBelow = document.getElementById(`task${String(parseInt(i) + 1)}`);
  if (itemBelow) {
    itemBelow.focus();
  }
}

// add an iterator (i) to the map function to create unique ID's
// since there are multiple lists on the page,
// use a naming convention which will not create any overlap
// with the unique id's from other lists.
// This requires the text parsing and text interpolation used above
// to move between unique elements.
render() {
  return (
    <div className="tasks-area">
      <div className="tasks-list">
        { Object.keys(this.props.tasks).map((taskNumber, i) => (
          <input
            id={`task${i}`}
            key={`task_key_${taskNumber}`}
            defaultValue={this.props.tasks[taskNumber].title}
          />
        ))}
      </div>
    </div>
  )
}
```

Movement between projects was handled similarly, using a different set of unique ID's. This also shows how easy it is to iterate through a plain old JavaScript object to render values to HTML fields in React. Since all tasks are fetched when you retrieve the project they belong to, and all tasks are retrieved when you retrieve all projects, this prevents expensive N+1 queries to the database.

### Showing off HTML5 for Better User Experience

Solo allows the user to both edit a project by selecting it and navigate to the enclosed tasks for that project at the same time. I accomplished this by simply wrapping the React NavLinks around customized input fields. In order to preserve the standard flow of user navigation with the Tab key to switch between fields, I set:
```HTML5
tabIndex="-1"
```

which is the React version of the HTML5 tabindex attribute. This skips over the enclosing links and lets the cursor arrive at the next input field, as would generally be expected.

### And more from React and Redux!
Here are a few other features I enjoyed:

* React Controlled Forms: allowing rapid updating between the database and the user, allowing for rapid saving of each new character as it is entered
* Authenticated routes: taking the one-page-app to its logical conclusion, this renders just a logged out page and a logged in page. Once the user is logged in, all the content of the app can be served to them from one page using conditionally rendered React Components which appear and disappear based on the route showing in the URL -- no new page load or refresh is ever required, as content arrives and departs from the page as it's called for.
* React style key listeners: The up and down arrows weren't the only user inputs to get custom styling. The enter key was also attached to the React event listener onKeyDown, allowing it to create a new task on demand for the user. The delete key was similarly enhanced. Wrapping it in a little logic to detect an empty input field, it will only delete a field from the interface (and the database, simultaneously) when all of the content has first been removed from that field. Hit delete again on an empty field and it all goes away.

![Solo Projects](docs/Screenshots/Solo_Projects.png)

## Onwards to the Future!

Solo is already a fully functional to-do list. But since it was so enjoyable to build, I'm excited about future directions for the project. These are the feature additions that I am considering exploring in the near future.

### Drag and Drop

Allow a user to pick up and drop tasks or projects to reposition them and order them to suit their needs.

### Due Dates

Allow users to specify a due date for tasks and sort by time created and time due.

### File Attachments

File attachments can be allowed in a manner very similar to the interface for click-to-select file and drag-to-upload that users enjoy on the profile screen for image uploading. Allowing file attachment to tasks is a nice future direction that will lend additional versatility to the clean interface of the app.

# Contributing

Ruby coverage is tracked in CodeClimate. Rubocop and specs are run in Github Actions. To track JavaScript coverage locally, run tests with the coverage variable set, e.g.

```bash
export COVERAGE="true" && bundle exec rspec
```
Then check your local js-coverage folder for the full report.


Here it is in production: [SoloAsana live](http://soloasana.com)

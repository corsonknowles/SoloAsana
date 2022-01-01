import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import merge from 'lodash/merge';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: this.props.projects };
    this.currentUser = this.props.currentUser;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.respondToEnterWithCreate = this.respondToEnterWithCreate.bind(this);
    this.respondToDeleteWhenEmpty = this.respondToDeleteWhenEmpty.bind(this);
    this.decideIfDeletable = this.decideIfDeletable.bind(this);
  }

  componentWillMount () {
    this.props.fetchProjects().then (
      () => {
        const newItem = document.getElementById("project0");
        if (newItem) {
          newItem.focus();
          newItem.click();
        }
      }
    )
  }

  respondToEnterWithCreate (event, i) {
    event.preventDefault();

    const nextItem = document.getElementById(`project${String(parseInt(i) + 1)}`);
    if (nextItem) {
      nextItem.focus();
      nextItem.click();
    }

    const newProject = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    };

    // set a new project in the database
    // when the newest item is the last item, move after creating it
    if (nextItem) {
      this.props.createProject(newProject);
    } else {
      this.props.createProject(newProject).then( () => {
        const newItem = document.getElementById(`project${String(parseInt(i) + 1)}`);
        if (newItem) {
          newItem.focus();
          newItem.click();
        }
      })
    }
  };

  respondToDeleteWhenEmpty (event, projectID, i) {
    event.preventDefault();
    console.log(this.props.projects.length)
    if (this.props.projects.length === 0) {
      const lastItem = document.getElementById("project0");
      if (lastItem) {
        lastItem.focus();
        lastItem.click();
    } else if (previousItem = document.getElementById(`project${String(parseInt(i) - 1)}`));
      previousItem.focus();
      previousItem.click();
    } else {
      // focus for the user's cursor and click to load tasks
      const nextItem = document.getElementById(`project${String(parseInt(i) + 1)}`);
      if (nextItem) {
        nextItem.focus();
        nextItem.click();
      }
    }
    this.props.destroyProject(projectID);
  };

  decideIfDeletable (event, key, keyCode) {
    // our input must be empty
    if (event.target.value.length !== 0) return false
    // it must be a delete key
    if (key === 'Delete' || key === 'Backspace' || keyCode === 8 || keyCode === 46) {
      if (Object.keys(this.props.projects).length > 1) {
        return true
      }
    }
    return false
  }

  handleKeyDown (projectID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'Enter' || keyCode === 13) {
        this.respondToEnterWithCreate(event, i);
      } else {
        if (this.decideIfDeletable(event, key, keyCode)) {
          this.respondToDeleteWhenEmpty(event, projectID, i);
        }
      }
    }
  }

  handleKeyUp (projectID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'ArrowUp' || keyCode === 38) {
        event.preventDefault();
        const previousProjectNumber = (parseInt(i) - 1);
        if (previousProjectNumber < 0) return null;

        const previousItem = document.getElementById(`project${String(previousProjectNumber)}`);
        if (previousItem) {
          previousItem.focus();
          previousItem.click();
        }
      } else if (key === 'ArrowDown' || keyCode === 40) {
        event.preventDefault();
        const nextItem = document.getElementById(`project${String(parseInt(i) + 1)}`);
        if (nextItem) {
          nextItem.focus();
          nextItem.click();
        }
      }
    }
  }

  handleInput (projectID, i) {
    return (event) => {
      const value = event.target.value;
      const project = this.props.projects[projectID];
      project.name = value;

      this.props.updateProject(project);
    }
  }

  render() {
    return (
      <div className="sidebar-container">
        {Object.keys(this.props.projects).map( (projectID, i) => (
          <NavLink tabIndex="-1" className={`sidebar-nav-link sidebar-item-row`} to={`/projects/${projectID}`} key={`Link${projectID}`}>
            <input
              type="text"
              name={`project${projectID}`}
              id={`project${i}`}
              key={`project_key_${projectID}`}
              defaultValue={this.props.projects[projectID].name}
              className="sidebar-item-row"
              placeholder="_________________________"
              onKeyUp={this.handleKeyUp(projectID, i)}
              onKeyDown={this.handleKeyDown(projectID, i)}
              onInput={this.handleInput(projectID, i)}
            />
          </NavLink>
          )
        )}
        <div className="spacer"></div>
        <div className="project-help-text">
          &#9166; Enter Adds a New Project
        </div>
        <div className="project-help-text">
          &#9003; Delete Removes an Empty Project
        </div>
        <div className="project-help-text">
          Saving Changes is Automatic
        </div>
      </div>
    )
  }
}

export default withRouter(Projects);

import React from 'react';
import { NavLink } from 'react-router-dom';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.respondToEnterWithCreate = this.respondToEnterWithCreate.bind(this);
    this.respondToDeleteWhenEmpty = this.respondToDeleteWhenEmpty.bind(this);
    this.decideIfDeletable = this.decideIfDeletable.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects().then(projects => {
      const latestID = this.props.currentUser.latest_project;
      const projectsById = projects.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
      const projectIDs = Object.keys(projectsById);
      let index = 0;
      if (latestID && projectIDs.includes(String(latestID))) {
        index = projectIDs.indexOf(String(latestID));
      }
      const idx = index;
      // Defer click until after React has rendered the sidebar; retry if DOM not ready
      const tryClick = (retries = 20) => {
        const item = document.getElementById(`project${idx}`);
        if (item) {
          item.focus();
          item.click();
          return;
        }
        if (retries > 0) {
          requestAnimationFrame(() => setTimeout(() => tryClick(retries - 1), 50));
        }
      };
      requestAnimationFrame(() => setTimeout(() => tryClick(), 0));
    });
  }

  componentDidUpdate(prevProps) {
    const currentProjectID = this.props.match.params.id;
    const prevProjectID = prevProps.match.params.id;
    if (currentProjectID && currentProjectID !== prevProjectID) {
      this.props.updateUser({
        ...this.props.currentUser,
        latest_project: parseInt(currentProjectID)
      });
    }
  }

  respondToEnterWithCreate(event, i) {
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

    if (nextItem) {
      this.props.createProject(newProject);
    } else {
      this.props.createProject(newProject).then(() => {
        const newItem = document.getElementById(`project${String(parseInt(i) + 1)}`);
        if (newItem) {
          newItem.focus();
          newItem.click();
        }
      });
    }
  }

  respondToDeleteWhenEmpty(event, projectID, i) {
    event.preventDefault();
    this.props.destroyProject(projectID);

    const previousItem = document.getElementById(`project${String(parseInt(i) - 1)}`);
    if (previousItem) {
      previousItem.focus();
      previousItem.click();
    } else {
      const nextItem = document.getElementById(`project${String(parseInt(i) + 1)}`);
      if (nextItem) {
        nextItem.focus();
        nextItem.click();
      }
    }
  }

  decideIfDeletable(event, key, keyCode) {
    if (event.target.value.length !== 0) return false;
    if (key === 'Delete' || key === 'Backspace' || keyCode === 8 || keyCode === 46) {
      if (Object.keys(this.props.projects).length > 1) {
        return true;
      }
    }
    return false;
  }

  handleKeyDown(projectID, i) {
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
    };
  }

  handleKeyUp(projectID, i) {
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
    };
  }

  handleInput(projectID, i) {
    return (event) => {
      const project = { ...this.props.projects[projectID], name: event.target.value };
      this.props.updateProject(project);
    };
  }

  render() {
    return (
      <div className="sidebar-container">
        {Object.keys(this.props.projects).map((projectID, i) => (
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
        ))}
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
    );
  }
}

export default Projects;

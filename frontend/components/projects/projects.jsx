import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, withRouter } from 'react-router-dom';
import merge from 'lodash/merge';

class Projects extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.projects
    }

    this.currentUser = this.props.currentUser;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillMount () {
    const newProject = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    }

    this.props.fetchProjects()
  }

  componentWillReceiveProps (nextProps) {
    const newProject2 = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    }

    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    } else if (Object.keys(nextProps.projects).length === 0) {
      this.props.createProject(newProject2)
    }

    // TODO solve this with routing or create a way for it to work in DidMount
    // let firstProject = this.props.projects[0].id;
    // let projectURL = `/projects/${firstProject}`;
    // return (
    //   <Redirect to={projectURL} />
    // );
  }

  handleKeyDown (projectID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'Enter' || keyCode === 13) {
        const newProject = {
          name: "",
          team_id: 1,
          user_id: this.currentUser.id
        }
        // set a new project in the database
        this.props.createProject(newProject);

        let nextItem = document.getElementById(String(parseInt(i) + 1))
        if (nextItem) {
          nextItem.focus();
        }
      } else if (event.target.value.length === 0 && Object.keys(this.props.projects).length > 1 && (key === 'Delete' || key === 'Backspace' || keyCode === 8 || keyCode === 46) ) {
        event.preventDefault();
        this.props.destroyProject(parseInt(projectID));
        this.props.history.push('/');

        let previousItem = document.getElementById(String(parseInt(i) - 1))
        if (previousItem) {
          previousItem.focus();
        }
      }
    }
  }

  handleKeyUp (projectID, i) {

    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      const value = event.target.value;
      const project = this.props.projects[projectID];
      project.name = value;

      if (key === 'ArrowUp' || keyCode === 38) {
        event.preventDefault();
        let previousItem = document.getElementById(String(parseInt(i) - 1))
        if (previousItem) {
          previousItem.focus();
        }

      } else if (key === 'ArrowDown' || keyCode === 40) {

        event.preventDefault();
        let nextItem = document.getElementById(String(parseInt(i) + 1))
        if (nextItem) {
          nextItem.focus();
        }
      } else {
        this.props.updateProject(project);
      }
    }
  }

  render() {
    return (
      <div className="sidebar-container">
        {Object.keys(this.props.projects).map( (projectID, i) => (
          <NavLink tabIndex="-1" className={`sidebar-nav-link sidebar-item-row`} to={`/projects/${projectID}`} key={`Link${projectID}`}>
            <input
              type="text"
              name={projectID}
              key={projectID}
              id={i}
              defaultValue={this.props.projects[projectID].name}
              className="sidebar-item-row"
              placeholder="_________________________"
              onKeyUp={this.handleKeyUp(projectID, i)}
              onKeyDown={this.handleKeyDown(projectID, i)}
            />
          </NavLink>
          )
        )}

        <div className="spacer">
        </div>
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
  )}
}

export default withRouter(Projects);

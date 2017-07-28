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
  }

  componentWillMount () {
    const newProject = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    }

    this.props.fetchProjects().then( () => {

      if (Object.keys(this.props.projects).length === 0) {
        this.props.createProject(newProject).then (
          (createdTask) => {
            // set the new task to state
            const newState = merge({}, this.state);
            newState.tasks[createdTask.id] = mustHaveTask;
            this.setState(newState);
          }
        )



      }
    });
  }

  componentWillReceiveProps (nextProps) {
    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    }
  }

  handleKeyDown (projectID) {

    return (event) => {
      const value = event.target.value
      const project = this.props.projects[projectID];
      project.name = value;

      if (event.key === 'Enter' || event.keyCode === 13) {
        this.props.updateProject(project);

        const newProject = {
          name: "",
          team_id: 1,
          user_id: this.currentUser.id
        }
        // set a new project in the database
        this.props.createProject(newProject).then (
          (createdProject) => {
            const newState = merge({}, this.state);
            newState.projects[createdProject.id] = createdProject;
            this.setState(newState);

          }
        )

      } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.keyCode === 8 || event.keyCode === 46) ) {

        this.props.destroyProject(parseInt(projectID));

      } else if (event.key === 'ArrowUp' || event.keyCode === 38) {
        event.preventDefault();
        let previousItem = document.getElementById(String(parseInt(projectID) - 1))
        if (previousItem) {
          previousItem.focus();
          previousItem.select();
        }

      } else if (event.key === 'ArrowDown' || event.keyCode === 40) {
        event.preventDefault();
        let nextItem = document.getElementById(String(parseInt(projectID) + 1))
        if (nextItem) {
          nextItem.focus();
          nextItem.select();
        }
      } else {
        this.props.updateProject(project);
      }
    }
  }

  render() {
    return (
      <div className="sidebar-container">
        {Object.keys(this.props.projects).map( (projectID) => (
          <NavLink tabIndex="-1" className={`sidebar-nav-link sidebar-item-row`} to={`/projects/${projectID}`} key={`Link${projectID}`}>
            <input
              type="text"
              name={projectID}
              key={projectID}
              id={projectID}
              defaultValue={this.props.projects[projectID].name}
              className="sidebar-item-row"
              placeholder="_________________________"
              onKeyDown={this.handleKeyDown(projectID)}
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
  )}

}
export default withRouter(Projects);

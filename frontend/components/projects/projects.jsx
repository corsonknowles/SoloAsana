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
        this.props.createProject(newProject);
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


      if (event.key === 'Enter' || event.charCode === 13) {
        const value = event.target.value
        const project = this.props.projects[projectID];
        project.name = value;

        this.props.updateProject(project);

        const newProject = {
          name: "",
          team_id: 1,
          user_id: this.currentUser.id
        }
        // set a new project in the database
        this.props.createProject(newProject);
        // set the new project in state
        const newState = merge({}, this.state);
        newState.projects[projectID] = newProject;
        this.setState(newState);

      } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.charCode === 8 || event.charCode === 46) ) {
        this.props.destroyProject(parseInt(projectID));

      } else {
        const value = event.target.value
        const project = this.props.projects[projectID];
        project.name = value;

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

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';
import { ProjectItem } from './project_item';
// import debounce from 'lodash/debounce';
import merge from 'lodash/merge';

class Projects extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.projects
    }

    this.currentUser = this.props.currentUser;

    this.handleChange = this.handleChange.bind(this);
    // this.updateEditedProject = debounce(this.updateEditedProject, 500).bind(this);
    this.updateEditedProject = this.updateEditedProject.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount () {
    this.props.fetchProjects(1)
  }

  componentWillReceiveProps (nextProps) {

    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    }
  }

  // componentWillUnmount() { this.props.clearErrors()};

  handleKeyPress (projectID) {

    return (event) => {
      if (event.key === 'Enter' || event.charCode === 13) {

        let newProject = {
          name: "",
          team_id: 1,
          user_id: this.currentUser.id
        }
        this.props.createProject(newProject);

      } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.charCode === 8 || event.charCode === 46) ) {
        this.props.destroyProject(projectID);
      }

    }
  }

  handleChange(projectID) {
    return (event) => {
      event.preventDefault();

      const target = event.target;
      const name = target.name;
      const newState = merge({}, this.state);

      newState.projects[projectID].name = event.target.value;
      this.updateEditedProject(projectID, event.target.value);
    }
  }

  updateEditedProject(projectID, value) {
    let project = this.props.projects[projectID];
    project.name = value;
    this.props.updateProject(project);
  }

  renderErrors(){
    return(
      <ul className="errors">
        {this.props.errors.map( (error, i) => (
          <li className="eachError" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    //write a selector to return dummy strings
    return (
      <div>
        {Object.keys(this.props.projects).map( (projectID) => (
            <input
              type="text"
              name={projectID}
              key={projectID}
              value={this.props.projects[projectID].name ? this.props.projects[projectID].name : ""}
              onChange={this.handleChange(projectID)}
              className="sidebar-item-row"
              placeholder="Name your new project here"
              onKeyDown={this.handleKeyPress(projectID)}
            />
          )
        )}

      </div>
  )}

}
export default Projects;

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link, NavLink } from 'react-router-dom';
import { ProjectItem } from './project_item';
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';

class Projects extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {

      projects: this.props.projects

    }

    this.currentUser = this.props.currentUser;

    this.handleChange = this.handleChange.bind(this);
    this.updateEditedProject = debounce(this.updateEditedProject, 500).bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount () {
    this.props.fetchProjects(1)
    setTimeout(() => console.log("this.props in willMount", this.props), 2000);
  }

  componentWillReceiveProps (nextProps) {
    console.log("will receive props");
    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    }
  }

  // componentWillUnmount() { this.props.clearErrors()};

  handleKeyPress () {
    return (event) => {
      if (event.key === 'Enter') {
        console.log('enter key pressed');
        let newProject = {
          name: "",
          team_id: 1,
          user_id: this.currentUser.id
        }
        this.props.createProject(newProject);
      }
    }
  }

  handleChange(projectID) {

    return (event) => {
      event.preventDefault();
      if (event.key === 'Enter') {
        console.log('enter key pressed');
      }
      const target = event.target;
      console.log(this);
      const name = target.name;
      // let editField = this.state.projects[event.target.key];
      const newState = merge({}, this.state);
      newState.projects[projectID].name = event.target.value;

      this.setState(newState, () => {
        this.updateEditedProject(projectID);
      });
    }
  }

  updateEditedProject(projectID) {
    let project = this.state.projects[projectID];
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

    // console.log("state.projects", this.state.projects);
    // console.log("this.state", this.state);
    // console.log("this.props", this.props);
    if (!this.state.projects[1]) {
      this.state.projects = { [1]: {name: "" } }
    }

    //write a selector to return dummy strings

    console.log(this.state.projects);
    return (
      <div>
        {Object.keys(this.props.projects).map( (projectID) => (
            <input
              type="text"
              name={projectID}
              key={projectID}
              value={this.state.projects[projectID].name}
              onChange={this.handleChange(projectID)}
              className="sidebar-item-row"
              placeholder="Should be a project input field"
              onKeyPress={this.handleKeyPress()}
            />
          )
        )}
      </div>
  )}

}
export default Projects;

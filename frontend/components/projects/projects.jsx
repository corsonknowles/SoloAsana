import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, withRouter } from 'react-router-dom';
// import { ProjectItem } from './project_item';
// import debounce from 'lodash/debounce';
import merge from 'lodash/merge';

class Projects extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.projects,
      cursor: 0,
      result: []
    }

    this.currentUser = this.props.currentUser;

    this.handleChange = this.handleChange.bind(this);
    // this.updateEditedProject = debounce(this.updateEditedProject, 500).bind(this);
    this.updateEditedProject = this.updateEditedProject.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.newProject = {
      name: "",
      team_id: 1,
      user_id: this.currentUser.id
    }
  }

  componentWillMount () {
    this.props.fetchProjects().then( () => {

      if (Object.keys(this.props.projects).length === 0) {
        this.props.createProject(this.newProject);
      }
    });
  }


  componentWillReceiveProps (nextProps) {

    if (Object.keys(this.props.projects).length === 0 && Object.keys(nextProps.projects).length > 0) {
      this.setState( { projects: nextProps.projects } )
    }
  }

  // componentWillUnmount() { this.props.clearErrors()};

  handleKeyDown (projectID) {
    // this.handleChange(projectID);

    return (event) => {
      const { cursor, result } = this.state;

      if (event.key === 'Enter' || event.charCode === 13) {


        this.props.createProject(this.newProject);

      } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.charCode === 8 || event.charCode === 46) ) {
        this.props.destroyProject(parseInt(projectID));
      }
      // arrow up/down button should select next/previous list element
      if (event.keyCode === 38 && cursor > 0) {
        this.setState( prevState => ({
          cursor: prevState.cursor - 1
        }))
      } else if (event.keyCode === 40 && cursor < result.length - 1) {
        this.setState( prevState => ({
          cursor: prevState.cursor + 1
        }))
      }
    }
  }

  handleKeyUp () {

  }

  handleChange(projectID) {
    return (event) => {
      // event.preventDefault();

      // const newState = merge({}, this.state);

      // newState.projects[projectID].name = event.target.value;

      this.updateEditedProject(projectID, event.target.value);
    }
  }

  handleKeyPress () {
    console.log("handleKeyDown is not in use");
  }

  updateEditedProject(projectID, value) {
    let project = this.props.projects[projectID];
    project.name = value;
    let newState = merge({}, this.state);
    this.setState(newState);
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
    const { cursor } = this.state
    return (
      <div className="sidebar-container">
        {Object.keys(this.props.projects).map( (projectID, i) => (
          <NavLink tabIndex="-1" className={`sidebar-nav-link sidebar-item-row ${cursor === i ? 'active' : ''}`} to={`/projects/${projectID}`} key={`Link${projectID}`}>
            <input
              type="text"
              name={projectID}
              key={projectID}
              id={projectID}
              value={this.props.projects[projectID].name ? this.props.projects[projectID].name : ""}
              onChange={this.handleChange(projectID)}
              className="sidebar-item-row"
              placeholder="_________________________"
              onKeyDown={this.handleKeyDown(projectID)}
              onKeyUp={this.handleKeyUp(projectID)}
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

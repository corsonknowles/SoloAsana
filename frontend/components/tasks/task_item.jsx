import React from 'react';
import ReactDOM from 'react-dom';

import { Link, NavLink } from 'react-router-dom';
import merge from 'lodash/merge';

class TaskItem extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        tasks: this.props.tasks
      }

      this.currentUser = this.props.currentUser;

      this.handleChange = this.handleChange.bind(this);
      // this.updateEditedProject = debounce(this.updateEditedProject, 500).bind(this);
      this.updateEditedTask = this.updateEditedTask.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillMount () {
      this.props.fetchTasks(projectID).then( () => {

        if (Object.keys(this.props.tasks).length === 0) {

          const mustHaveTask = {
            name: "",
            team_id: 1,
            project_id: projectID
            user_id: this.currentUser.id
          }
          this.props.createTask(mustHaveTask);
        }
      });
    }

    componentWillReceiveProps (nextProps) {

      if (Object.keys(this.props.tasks).length === 0 && Object.keys(nextProps.tasks).length > 0) {
        this.setState( { tasks: nextProps.tasks } )
      }
    }

    // componentWillUnmount() { this.props.clearErrors()};

    handleKeyPress (taskID) {

      return (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {

          let newTask = {
            name: "",
            team_id: 1,
            user_id: this.currentUser.id
          }
          this.props.createTask(newTask);

        } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.charCode === 8 || event.charCode === 46) ) {
          this.props.destroyTask(taskID);
        }
        if (event.key === 'Up' || event.charCode === 38) {
          document.getElementById(taskID - 1).focus();
          document.getElementById(taskID - 1).select();
        }
        if (event.key === 'Down' || event.charCode === 40) {
          document.getElementById(taskID + 1).focus();
          document.getElementById(taskID + 1).select();
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
          <div className="spacer"></div>
          <div className="project-help-text">
            Enter Adds a New Task
          </div>

          <div className="project-help-text">
            Delete Removes an Empty Task
          </div>


        </div>
    )}

  }

export default TaskItem;

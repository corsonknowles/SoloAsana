import React from 'react';
import ReactDOM from 'react-dom';

import { Link, NavLink } from 'react-router-dom';
import merge from 'lodash/merge';

class Tasks extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        tasks: this.props.tasks
      }
      this.currentUser = this.props.currentUser;
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentWillMount () {
      let projectID = parseInt(this.props.match.params.id);
      if (projectID) {
        this.props.fetchTasksByProject(projectID).then( () => {
          if (Object.keys(this.props.tasks).length === 0) {
            const mustHaveTask = {
              title: "",
              team_id: 1,
              project_id: projectID,
              user_id: this.currentUser.id,
              done: false,
              section: false
          }
          this.props.createTask(mustHaveTask);
        }
      });
    }
    }

    componentWillReceiveProps (nextProps) {
      if (Object.keys(this.props.tasks).length === 0 && Object.keys(nextProps.tasks).length > 0) {
        this.setState( { tasks: nextProps.tasks } )
      }
    }

    handleKeyDown (taskID) {
      this.handleChange(taskID);

      return (event) => {
        let projectID = parseInt(this.props.match.params.id);
        if (event.key === 'Enter' || event.charCode === 13) {
          let newTask = {
            title: "",
            team_id: 1,
            project_id: projectID,
            user_id: this.currentUser.id,
            done: false,
            section: false
          }

          // push the new task to the database
          this.props.createTask(newTask);

          // set the new task to state
          const newState = merge({}, this.state);
          newState.tasks[taskID] = newTask;
          this.setState(newState);

        } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.charCode === 8 || event.charCode === 46) ) {
          this.props.destroyTask(taskID);
        }

      }
    }

    handleChange(taskID) {
      return (event) => {
        const value = event.target.value;
        const task = this.props.tasks[taskID];
        task.title = value;

        this.props.updateTask(task)
      }
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
        <div className="tasks-list">
          <div className="svg-container">
          <svg className="check-icon" title="check-icon" viewBox="0 0 32 32"><polygon points="27.672,4.786 10.901,21.557 4.328,14.984 1.5,17.812 10.901,27.214 30.5,7.615 "></polygon></svg>
          </div>
          {Object.keys(this.props.tasks).map( (taskID) => (

              <input
                type="text"
                name={`task${taskID}`}
                id={`task${taskID}`}
                key={`task${taskID}`}
                defaultValue={this.props.tasks[taskID].title}
                className="tasks-item-row"
                placeholder="Enter your new task here"
                onKeyDown={this.handleKeyDown(taskID)}
              />
            )
          )}
          <div className="spacer"></div>
            <div className="project-help-text">
              &#9166; Enter Adds a New Task
            </div>

            <div className="project-help-text">
              &#9003; Delete Removes an Empty Task
            </div>

            <div className="project-help-text">
              Saving Changes is Automatic
            </div>


        </div>
    )}

  }

export default Tasks;

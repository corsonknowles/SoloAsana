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
      let projectID = parseInt(nextProps.match.params.id);

      if (Object.keys(this.props.tasks).length === 0 && Object.keys(nextProps.tasks).length > 0) {
        this.setState( { tasks: nextProps.tasks } )
      }
      if (this.props.match.params.id !== nextProps.match.params.id ) {
        this.props.fetchTasksByProject(projectID)

      }
    }

    handleKeyDown (taskID) {
      return (event) => {

        const projectID = parseInt(this.props.match.params.id);
        if (event.key === 'Enter' || event.charCode === 13) {
          let newTask = {
            title: "",
            team_id: 1,
            project_id: projectID,
            user_id: this.currentUser.id,
            done: false,
            section: false
          }
          const value = event.target.value;
          const task = this.props.tasks[taskID];
          task.title = value;

          this.props.updateTask(task)

          // push the new task to the database
          this.props.createTask(newTask);

          // set the new task to state
          const newState = merge({}, this.state);
          newState.tasks[taskID] = newTask;
          this.setState(newState);

        } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.charCode === 8 || event.charCode === 46) ) {
          this.props.destroyTask(taskID);
        } else {
          const value = event.target.value;
          const task = this.props.tasks[taskID];
          task.title = value;

          this.props.updateTask(task)
        }
      }
    }

    render() {
      return (
        <div className="tasks-area">

          <div className="tasks-list">
            {Object.keys(this.props.tasks).map( (taskNumber) => (
                <input
                  type="text"
                  name={`task${taskNumber}`}
                  id={`task${taskNumber}`}
                  key={`task${taskNumber}`}
                  defaultValue={this.props.tasks[taskNumber].title}
                  className="tasks-item-row"
                  placeholder="Enter your new task here"
                  onKeyDown={this.handleKeyDown(taskNumber)}
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
        </div>
    )}
  }
export default Tasks;

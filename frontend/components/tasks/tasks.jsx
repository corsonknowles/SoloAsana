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
      this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentWillMount () {
      let projectID;
      if (this.props.match.params.id) {
        projectID = parseInt(this.props.match.params.id);
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
          this.props.createTask(mustHaveTask).then (
            (createdTask) => {
              // set the new task to state
              const newState = merge({}, this.state);
              newState.tasks[createdTask.id] = createdTask;
              this.setState(newState);
            }
          )
        }
      });
    }
    }

    componentWillReceiveProps (nextProps) {

      let projectID;
      if (nextProps.match.params.id) {
        projectID = nextProps.match.params.id;
      }

      if (projectID && Object.keys(this.props.tasks).length === 0 && Object.keys(nextProps.tasks).length > 0) {
        this.setState( { tasks: nextProps.tasks } )
      }

      if (projectID && this.props.match.params.id !== nextProps.match.params.id ) {
        this.props.fetchTasksByProject(projectID).then( (tasks) => {

          if (Object.keys(tasks).length === 0) {
            const mustHaveTask2 = {
              title: "",
              team_id: 1,
              project_id: projectID,
              user_id: this.currentUser.id,
              done: false,
              section: false
          }

            this.props.createTask(mustHaveTask2).then (
              (createdTask) => {
                // set the new task to state
                const newState = merge({}, this.state);
                newState.tasks[createdTask.id] = mustHaveTask2;
                this.setState(newState);
            }
          )

        }
      });

      }
    }


    // componentDidMount () {
    //   if (Object.keys(this.props.tasks).length === 0) {
    //     let projectID = parseInt(this.props.match.params.id);
    //     this.props.fetchTasksByProject(projectID)
    //   }
    // }

    handleKeyDown () {
      //as needed
    }
    handleKeyUp (taskID, i) {
      return (event) => {
        const key = event.key;
        const keyCode = event.keyCode;

        const projectID = parseInt(this.props.match.params.id);
        const value = event.target.value;
        const task = this.props.tasks[taskID];
        task.title = value;

        if (key === 'Enter' || keyCode === 13) {
          this.props.updateTask(task)

          let newTask = {
            title: "",
            team_id: 1,
            project_id: projectID,
            user_id: this.currentUser.id,
            done: false,
            section: false
          }

          // push the new task to the database
          this.props.createTask(newTask).then (
            (createdTask) => {
              // set the new task to state
              const newState = merge({}, this.state);
              newState.tasks[createdTask.id] = createdTask;
              this.setState(newState);
            }
          )

          // refactor this for tasks and projects: getElementsByName,
          // more tasks than projects on avg, so change projects names to be project{i} and these names to be {i}
          // map the projects name lists to plain numbers
          // user Array.prototype.findIndex() then add 1
          let itemBelow = document.getElementById(`task${String(parseInt(i) + 1)}`);
          if (itemBelow) {
            itemBelow.focus();
            itemBelow.select();
          }

        } else if (event.target.value.length === 0 && (event.key === 'Delete' || event.key === 'Backspace' || event.keyCode === 8 || event.keyCode === 46) ) {
          this.props.destroyTask(taskID);

        } else if (event.key === 'ArrowUp' || event.keyCode === 38) {
          event.preventDefault();
          let previousItem = document.getElementById(`task${String(parseInt(i) - 1)}`);
          if (previousItem) {
            previousItem.focus();
            previousItem.select();
          }
        } else if (event.key === 'ArrowDown' || event.keyCode === 40) {
          event.preventDefault();
          let nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
          if (nextItem) {
            nextItem.focus();
            nextItem.select();
          }

        } else {
          this.props.updateTask(task)
        }
      }
    }

    render() {
      return (
        <div className="tasks-area">

          <div className="tasks-list">
            {Object.keys(this.props.tasks).map( (taskNumber, i) => (
                <input
                  type="text"
                  name={`task${taskNumber}`}
                  id={`task${i}`}
                  key={`task${taskNumber}`}
                  defaultValue={this.props.tasks[taskNumber].title}
                  className="tasks-item-row"
                  placeholder="Enter your new task here"
                  onKeyUp={this.handleKeyUp(taskNumber, i)}
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

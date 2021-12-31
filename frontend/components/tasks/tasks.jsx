import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import merge from 'lodash/merge';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.tasks };
    this.currentUser = this.props.currentUser;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
    // this.handleInitialization = this.handleInitialization.bind(this);
  }

  componentWillMount () {
    let projectID;
    if (this.props.match.params.id) {
      projectID = parseInt(this.props.match.params.id);
      this.props.fetchTasksByProject(projectID)
        // .then( (fetchedTasks) => {
        //   if (fetchedTasks.length === 0) {
        //     this.handleInitialization(projectID);
        //   }
        // });
    }
  }

  componentWillReceiveProps (nextProps) {
    let projectID;
    if (nextProps.match.params.id) {
      projectID = nextProps.match.params.id;
    }

    if (projectID && this.props.match.params.id !== nextProps.match.params.id ) {
      this.props.fetchTasksByProject(projectID)
      // .then((tasks) => {
      //   if (tasks.length === 0) {
      //     this.handleInitialization(projectID);
      //   }
      // });
    }
  }

  // handleInitialization (projectID) {
  //   const mustHaveTask = {
  //     title: "",
  //     team_id: 1,
  //     project_id: projectID,
  //     user_id: this.currentUser.id,
  //     done: false,
  //     section: false
  //   };
  //
  //   this.props.createTask(mustHaveTask);
  // }

  handleKeyDown (taskID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'Enter' || keyCode === 13) {
        const projectID = parseInt(this.props.match.params.id);

        const newTask = {
          title: "",
          team_id: 1,
          project_id: projectID,
          user_id: this.currentUser.id,
          done: false,
          section: false
        };

        // push the new task to the database
        this.props.createTask(newTask)

        // Move down 1 in the list by focusing on the next item
        const nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
        if (nextItem) {
          nextItem.focus();
        }
      } else {
        const empty = (event.target.value.length === 0);
        const mustBeOneTask = (Object.keys(this.props.tasks).length > 1);
        const deleteKeys = (key === 'Delete' || key === 'Backspace' || keyCode === 8 || keyCode === 46);
        if (empty && mustBeOneTask && deleteKeys) {
          event.preventDefault();
          this.props.destroyTask(taskID);
          const previousItem = document.getElementById(`task${String(parseInt(i) - 1)}`);
          if (previousItem) {
            previousItem.focus();
          } else {
            // this will focus on the last remaining task if all preceding ones are deleted
            const nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
            if (nextItem) {
              nextItem.focus();
            }
          }
        }
      }
    }
  }

  handleKeyUp (taskID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'ArrowUp' || keyCode === 38) {
        event.preventDefault();
        const previousItem = document.getElementById(`task${String(parseInt(i) - 1)}`);
        if (previousItem) {
          previousItem.focus();
        }
      } else if (key === 'ArrowDown' || keyCode === 40) {
        event.preventDefault();
        const nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
        if (nextItem) {
          nextItem.focus();
        }
      } else {

      }
    }
  }

  handleInput (taskID, i) {
    return (event) => {
      const value = event.target.value;
      const task = this.props.tasks[taskID];
      task.title = value;

      this.props.updateTask(task)
    }
  }

  render() {
    return (
      <div className="tasks-area">
        <div className="tasks-list">
          { Object.keys(this.props.tasks).map((taskNumber, i) => (
            <input
              type="text"
              name={`task${taskNumber}`}
              id={`task${i}`}
              key={`task_key_${taskNumber}`}
              defaultValue={this.props.tasks[taskNumber].title}
              className="tasks-item-row"
              placeholder="Enter your new task here"
              onKeyUp={this.handleKeyUp(taskNumber, i)}
              onKeyDown={this.handleKeyDown(taskNumber, i)}
              onInput={this.handleInput(taskNumber, i)}
            />
          ))}
          <div className="spacer"></div>
          <div className="task-help-text">&#9166; Enter Adds a New Task</div>
          <div className="task-help-text">&#9003; Delete Removes an Empty Task</div>
          <div className="task-help-text">Saving Changes is Automatic</div>
        </div>
      </div>
    )
  }
}

export default Tasks;

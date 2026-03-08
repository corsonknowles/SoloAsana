import React from 'react';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubtaskKeyDown = this.handleSubtaskKeyDown.bind(this);
    this.handleSubtaskKeyUp = this.handleSubtaskKeyUp.bind(this);
    this.createSubtask = this.createSubtask.bind(this);
  }

  componentDidMount() {
    const projectID = this.props.match.params.id;
    if (projectID) {
      this.props.fetchTasksByProject(projectID);
    }
  }

  componentDidUpdate(prevProps) {
    const projectID = this.props.match.params.id;
    if (projectID && prevProps.match.params.id !== projectID) {
      this.props.fetchTasksByProject(projectID);
    }
  }

  rootTaskIDs() {
    const tasks = this.props.tasks;
    return Object.keys(tasks).filter(id => !tasks[id].task_id);
  }

  subtaskIDsOf(parentTaskID) {
    const tasks = this.props.tasks;
    return Object.keys(tasks).filter(id => tasks[id].task_id === parseInt(parentTaskID));
  }

  newTaskBase() {
    return {
      title: "",
      team_id: 1,
      project_id: parseInt(this.props.match.params.id),
      user_id: this.currentUser.id,
      done: false,
      section: false
    };
  }

  handleKeyDown(taskID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'Enter' || keyCode === 13) {
        const nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
        if (nextItem) nextItem.focus();

        if (nextItem) {
          this.props.createTask(this.newTaskBase());
        } else {
          this.props.createTask(this.newTaskBase()).then(() => {
            const newItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
            if (newItem) newItem.focus();
          });
        }
      } else {
        const empty = (event.target.value.length === 0);
        const rootCount = this.rootTaskIDs().length;
        const deleteKeys = (key === 'Delete' || key === 'Backspace' || keyCode === 8 || keyCode === 46);
        if (empty && rootCount > 1 && deleteKeys) {
          event.preventDefault();
          this.props.destroyTask(taskID);
          const previousItem = document.getElementById(`task${String(parseInt(i) - 1)}`);
          if (previousItem) {
            previousItem.focus();
          } else {
            const nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
            if (nextItem) nextItem.focus();
          }
        }
      }
    };
  }

  handleKeyUp(taskID, i) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'ArrowUp' || keyCode === 38) {
        event.preventDefault();
        const previousItem = document.getElementById(`task${String(parseInt(i) - 1)}`);
        if (previousItem) previousItem.focus();
      } else if (key === 'ArrowDown' || keyCode === 40) {
        event.preventDefault();
        const nextItem = document.getElementById(`task${String(parseInt(i) + 1)}`);
        if (nextItem) nextItem.focus();
      }
    };
  }

  handleInput(taskID) {
    return (event) => {
      const task = { ...this.props.tasks[taskID], title: event.target.value };
      this.props.updateTask(task);
    };
  }

  createSubtask(parentTaskID, parentIndex) {
    const newSubtask = { ...this.newTaskBase(), task_id: parseInt(parentTaskID) };
    this.props.createTask(newSubtask).then(() => {
      const newSI = this.subtaskIDsOf(parentTaskID).length - 1;
      const newItem = document.getElementById(`subtask${parentIndex}_${newSI}`);
      if (newItem) newItem.focus();
    });
  }

  handleSubtaskKeyDown(stID, parentIndex, si) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'Enter' || keyCode === 13) {
        event.preventDefault();
        const parentTaskID = this.props.tasks[stID].task_id;
        const newSubtask = { ...this.newTaskBase(), task_id: parentTaskID };
        this.props.createTask(newSubtask).then(() => {
          const newItem = document.getElementById(`subtask${parentIndex}_${si + 1}`);
          if (newItem) newItem.focus();
        });
      } else {
        const empty = (event.target.value.length === 0);
        const deleteKeys = (key === 'Delete' || key === 'Backspace' || keyCode === 8 || keyCode === 46);
        if (empty && deleteKeys) {
          event.preventDefault();
          this.props.destroyTask(stID);
          const prevItem = document.getElementById(`subtask${parentIndex}_${si - 1}`);
          if (prevItem) {
            prevItem.focus();
          } else {
            const parentItem = document.getElementById(`task${parentIndex}`);
            if (parentItem) parentItem.focus();
          }
        }
      }
    };
  }

  handleSubtaskKeyUp(stID, parentIndex, si) {
    return (event) => {
      const key = event.key;
      const keyCode = event.keyCode;

      if (key === 'ArrowUp' || keyCode === 38) {
        event.preventDefault();
        const prevItem = document.getElementById(`subtask${parentIndex}_${si - 1}`);
        if (prevItem) {
          prevItem.focus();
        } else {
          const parentItem = document.getElementById(`task${parentIndex}`);
          if (parentItem) parentItem.focus();
        }
      } else if (key === 'ArrowDown' || keyCode === 40) {
        event.preventDefault();
        const nextItem = document.getElementById(`subtask${parentIndex}_${si + 1}`);
        if (nextItem) nextItem.focus();
      }
    };
  }

  render() {
    const tasks = this.props.tasks;
    const rootIDs = this.rootTaskIDs();

    return (
      <div className="tasks-area">
        <div className="tasks-list">
          {rootIDs.map((taskID, i) => {
            const subtaskIDs = this.subtaskIDsOf(taskID);
            return (
              <div key={`task_container_${taskID}`} className="task-with-subtasks">
                <div className="task-row">
                  <input
                    type="text"
                    name={`task${taskID}`}
                    id={`task${i}`}
                    key={`task_key_${taskID}`}
                    defaultValue={tasks[taskID].title}
                    className="tasks-item-row"
                    placeholder="Enter your new task here"
                    onKeyUp={this.handleKeyUp(taskID, i)}
                    onKeyDown={this.handleKeyDown(taskID, i)}
                    onInput={this.handleInput(taskID)}
                  />
                  <button
                    className="add-subtask-btn"
                    onClick={() => this.createSubtask(taskID, i)}
                    title="Add subtask"
                    tabIndex="-1"
                  >+</button>
                </div>
                {subtaskIDs.map((stID, si) => (
                  <div key={`subtask_container_${stID}`} className="subtask-row">
                    <input
                      type="text"
                      name={`subtask${stID}`}
                      id={`subtask${i}_${si}`}
                      key={`subtask_key_${stID}`}
                      defaultValue={tasks[stID].title}
                      className="tasks-item-row subtask"
                      placeholder="Enter subtask here"
                      onKeyUp={this.handleSubtaskKeyUp(stID, i, si)}
                      onKeyDown={this.handleSubtaskKeyDown(stID, i, si)}
                      onInput={this.handleInput(stID)}
                    />
                  </div>
                ))}
              </div>
            );
          })}
          <div className="spacer"></div>
          <div className="task-help-text">&#9166; Enter Adds a New Task</div>
          <div className="task-help-text">&#9003; Delete Removes an Empty Task</div>
          <div className="task-help-text">Saving Changes is Automatic</div>
        </div>
      </div>
    );
  }
}

export default Tasks;

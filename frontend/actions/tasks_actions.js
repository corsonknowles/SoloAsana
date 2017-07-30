import * as TASKS from '../util/tasks_api_util';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const RECEIVE_TASKS_BY_PROJECT = "RECEIVE_TASKS_BY_PROJECT";

// sync actions
export const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks
});

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

export const receiveTasksByProject = project => ({
  type: RECEIVE_TASKS_BY_PROJECT,
  project
})

export const deleteTask = id => ({
  type: DELETE_TASK,
  id
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

// async actions

export const createTask = task => dispatch => {
  return (TASKS.createTask(task)
    .then(newTask => {
      dispatch(receiveTask(newTask));
      return newTask;
    }
  )
)};

export const updateTask = task => dispatch => {
  return TASKS.updateTask(task)
    .then(returnTask => {
      dispatch(receiveTask(returnTask));
      return returnTask;
    }
  );
};

export const fetchTasks = projectID => dispatch => {
  return TASKS.fetchTasks(projectID)
    .then(tasks => dispatch(receiveTasks(tasks))
  )
};

export const fetchTask = id => dispatch => {
  return TASKS.fetchTask(id)
    .then(task => dispatch(receiveTask(task))
  )
};

export const fetchTasksByProject = projectID => dispatch => {
  return TASKS.fetchTasksByProject(projectID)
    .then(projectwithtasks => {
      dispatch(receiveTasksByProject(projectwithtasks))
      return projectwithtasks.tasks;
    }

  )
};

export const destroyTask = id => dispatch => {
  return TASKS.deleteTask(id)
    .then( () => dispatch(deleteTask(id)) );
};

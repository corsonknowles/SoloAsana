import * as TASKS from '../util/tasks_api_util';

export const RECEIVE_TASK = 'RECEIVE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const RECEIVE_TASKS_BY_PROJECT = "RECEIVE_TASKS_BY_PROJECT";

// synchronous actions
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

// asynchronous actions
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

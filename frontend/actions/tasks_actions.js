import * as TasksApiUtil from '../util/tasks_api_util';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// sync actions
export const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks
});

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

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

export const createTask = task => dispatch => (
  TasksApiUtil.createTask(task)
    .then(newTask => {
      dispatch(receiveTask(newTask));
      return newTask;
    }, error => dispatch(receiveErrors(error.responseJSON))
  )
);

export const updateTask = task => dispatch => {
  return TasksApiUtil.updateTask(task)
    .then(returnTask => {
      dispatch(receiveTask(returnTask));
      return returnTask;
    }, error => dispatch(receiveErrors(error.responseJSON))
  );
};

export const fetchTasks = projectID => dispatch => {}
  return TasksApiUtil.fetchTasks(projectID)
};

export const fetchTask = id => dispatch => {
  return TasksApiUtil.fetchTask(id)
};

export const destroyTask = id => dispatch => {
  return TasksApiUtil.deleteTask(id)
    .then( () => dispatch(deleteTask(id));
  );
};

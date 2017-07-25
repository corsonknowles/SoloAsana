import {
  RECEIVE_TASKS,
  RECEIVE_TASK,
  DELETE_TASK,
  RECEIVE_ERRORS,
  CLEAR_ERRORS

  } from '../actions/tasks_actions';
import merge from 'lodash/merge';

const SessionReducer = function(state = _nullUser, action){
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_TASKS:
      newState = {};
      action.tasks.forEach(task => newState[task.id] = task);
      return newState;
        // tasks: action.tasks,
        // errors: []
    case RECEIVE_TASK:
      newState = merge({}, state, { action.task.id: action.task });
      return newState;
    case DELETE_TASK:
      nextState = merge({}, state);
      delete nextState[action.id];
      return nextState;
    case RECEIVE_ERRORS:
      const errors = {errors: action.errors};
      newState = merge({}, state, errors);
      return newState;
    case CLEAR_ERRORS:
      newState = merge({}, state);
      newState.errors = [];
      return newState;
    default:
      return state;
  }
};

export default TasksReducer;

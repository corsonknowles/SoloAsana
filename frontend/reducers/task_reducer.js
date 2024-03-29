import {
  RECEIVE_TASK,
  DELETE_TASK,
  RECEIVE_TASKS_BY_PROJECT

  } from '../actions/tasks_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'
import merge from 'lodash/merge';

const TaskReducer = function(state = {}, action){
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_TASKS_BY_PROJECT:
      newState = {};
      action.project.tasks.forEach(task => newState[task.id] = task);
      return newState;
    case RECEIVE_TASK:
      newState = merge({}, state);
      newState[action.task.id] = action.task;
      return newState;
    case DELETE_TASK:
      newState = merge({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_LOGOUT_SUCCESS:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default TaskReducer;

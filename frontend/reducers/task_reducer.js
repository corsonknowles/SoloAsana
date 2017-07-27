import {
  RECEIVE_TASKS,
  RECEIVE_TASK,
  DELETE_TASK,
  RECEIVE_ERRORS,
  CLEAR_ERRORS

  } from '../actions/tasks_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'
import merge from 'lodash/merge';

const TaskReducer = function(state = {}, action){
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_TASKS:
      newState = {};
      action.tasks.forEach(task => newState[task.id] = task);
      return newState;
    case RECEIVE_TASK:
      console.log(action.task);

      newState = merge({}, state, { [action.task.id]: action.task });

      return newState;
    case DELETE_TASK:
      nextState = merge({}, state);
      delete nextState[action.id];
      return nextState;
    case RECEIVE_LOGOUT_SUCCESS:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default TaskReducer;

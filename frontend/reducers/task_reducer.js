import {
  RECEIVE_TASK,
  DELETE_TASK,
  RECEIVE_TASKS_BY_PROJECT
} from '../actions/tasks_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'

const TaskReducer = function(state = {}, action){
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_TASKS_BY_PROJECT: {
      const newState = {};
      action.project.tasks.forEach(task => newState[task.id] = task);
      return newState;
    }
    case RECEIVE_TASK:
      return { ...state, [action.task.id]: action.task };
    case DELETE_TASK: {
      const { [action.id]: _removed, ...rest } = state;
      return rest;
    }
    case RECEIVE_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default TaskReducer;

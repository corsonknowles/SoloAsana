import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT,
  DELETE_PROJECT,
  RECEIVE_ERRORS,
  CLEAR_ERRORS
} from '../actions/projects_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'
import merge from 'lodash/merge';

const ProjectReducer = function(state = {}, action){
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_PROJECTS:
      newState = {};
      action.projects.forEach(project => newState[project.id] = project);
      return newState;
    case RECEIVE_PROJECT:
      newState = merge({}, state, { [action.project.id]: action.project });
      return newState;
    case DELETE_PROJECT:
      newState = merge({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_ERRORS:
      const errors = {errors: action.errors};
      newState = merge({}, state, errors);
      return newState;
    case CLEAR_ERRORS:
      newState = merge({}, state);
      newState.errors = [];
      return newState;
    case RECEIVE_LOGOUT_SUCCESS:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default ProjectReducer;

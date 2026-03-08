import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT,
  DELETE_PROJECT,
  RECEIVE_ERRORS,
  CLEAR_ERRORS
} from '../actions/projects_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'

const ProjectReducer = function(state = {}, action){
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_PROJECTS: {
      const newState = {};
      action.projects.forEach(project => newState[project.id] = project);
      return newState;
    }
    case RECEIVE_PROJECT:
      return { ...state, [action.project.id]: action.project };
    case DELETE_PROJECT: {
      const { [action.id]: _removed, ...rest } = state;
      return rest;
    }
    case RECEIVE_ERRORS:
      return { ...state, errors: action.errors };
    case CLEAR_ERRORS:
      return { ...state, errors: [] };
    case RECEIVE_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default ProjectReducer;

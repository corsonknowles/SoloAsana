import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT,
  DELETE_PROJECT

} from '../actions/projects_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'
import merge from 'lodash/merge';

const ProjectReducer = function(state = {}, action){
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_PROJECTS:
      newState = { };
      action.projects.forEach(project => newState[project.id] = project);
      return newState;
    case RECEIVE_PROJECT:
      newState = merge({}, state, { [action.project.id]: action.project });
      return newState;
    case DELETE_PROJECT:
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

export default ProjectReducer;

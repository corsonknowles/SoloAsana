import {
  RECEIVE_TEAMS,
  RECEIVE_TEAM,
  DELETE_TEAM,
  RECEIVE_ERRORS,
  CLEAR_ERRORS

} from '../actions/teams_actions';
import { RECEIVE_LOGOUT_SUCCESS } from '../actions/session_actions'
import merge from 'lodash/merge';

const TeamReducer = function(state = {}, action){
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_TEAMS:
      newState = { };
      action.teams.forEach(team => newState[team.id] = team);
      return newState;
    case RECEIVE_TEAM:
      newState = merge({}, state, { [action.team.id]: action.team });
      return newState;
    case DELETE_TEAM:
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

export default TeamReducer;

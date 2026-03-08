import { RECEIVE_CURRENT_USER,
         RECEIVE_LOGOUT_SUCCESS,
         RECEIVE_ERRORS,
         CLEAR_ERRORS
       }
         from '../actions/session_actions';

const _nullUser = {
  currentUser: null,
  errors: []
};

const SessionReducer = function(state = _nullUser, action){
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: []
      };
    case RECEIVE_LOGOUT_SUCCESS:
      return { ..._nullUser };
    case RECEIVE_ERRORS:
      return { ...state, errors: action.errors };
    case CLEAR_ERRORS:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default SessionReducer;

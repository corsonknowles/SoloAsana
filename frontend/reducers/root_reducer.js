import { combineReducers } from 'redux';
import TaskReducer from './task_reducer';
import SessionReducer from './session_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  task: TaskReducer
});

export default rootReducer;

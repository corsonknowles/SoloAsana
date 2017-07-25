import { combineReducers } from 'redux';
import TaskReducer from './task_reducer';
import SessionReducer from './session_reducer';
import ProjectReducer from './project_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  task: TaskReducer,
  project: ProjectReducer
});

export default rootReducer;

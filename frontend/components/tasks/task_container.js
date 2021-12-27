import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTasksByProject, createTask, destroyTask, updateTask, receiveErrors, clearErrors } from '../../actions/tasks_actions';
import Tasks from './tasks';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  createTask: (task) => dispatch(createTask(task)),
  destroyTask: (id) => dispatch(destroyTask(id)),
  updateTask: (task) => dispatch(updateTask(task)),
  fetchTasksByProject: (projectID) => dispatch(fetchTasksByProject(projectID))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks))

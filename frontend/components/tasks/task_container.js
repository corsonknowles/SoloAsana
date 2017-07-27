import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createTask, destroyTask, fetchTask, fetchTasks, updateTask, receiveErrors, clearErrors } from '../../actions/tasks_actions';
import Tasks from './tasks';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({

  createTask: (task) => dispatch(createTask(task)),
  destroyTask: (id) => dispatch(destroyTask(id)),
  fetchTasks: (projectID) => dispatch(fetchTasks(projectID)),
  fetchTask: (id) => dispatch(fetchTask(id)),
  updateTask: (task) => dispatch(updateTask(task))

});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks))

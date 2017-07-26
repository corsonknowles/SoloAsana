import { connect } from 'react-redux';
import { createTask, updateTask, fetchTask, fetchTasks, destroyTask, receiveErrors, clearErrors } from '../../actions/tasks_actions';
import Tasks from './tasks';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: (projectID) => dispatch(fetchTasks(projectID)),
  fetchTask: (id) => dispatch(fetchTask(id)),
  createTask: (task) => dispatch(createTask(task)),
  updateTask: (task) => dispatch(updateTask(task)),
  destroyTask: (id) => dispatch(destroyTask(id))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

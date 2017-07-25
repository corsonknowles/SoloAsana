import { connect } from 'react-redux';
import { createTask, updateTask, fetchTask, fetchTasks, destroyTask, receiveErrors, clearErrors } from '../../actions/tasks_actions';
import Tasks from './tasks';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  logout: () => dispatch(requestLogout()),
  updateUser: (user) => dispatch(updateUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

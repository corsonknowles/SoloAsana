import { connect } from 'react-redux';
import { createTask, updateTask, fetchTask, fetchTasks, destroyTask, receiveErrors, clearErrors } from '../../actions/projects_actions';
import Projects from './projects';

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
)(Projects);

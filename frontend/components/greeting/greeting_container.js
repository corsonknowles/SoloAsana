import { connect } from 'react-redux';
import { receiveErrors, clearErrors, updateUser, requestLogout } from '../../actions/session_actions';
import Greeting from './greeting';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  receiveErrors: () => dispatch(receiveErrors()),
  clearErrors: () => dispatch(clearErrors()),
  logout: () => dispatch(requestLogout()),
  updateUser: (user) => dispatch(updateUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);

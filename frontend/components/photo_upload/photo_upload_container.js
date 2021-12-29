import { connect } from 'react-redux';
import { clearErrors, updateUser, requestLogout } from '../../actions/session_actions';
import PhotoUpload from './photo_upload';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  updateUser: (user) => dispatch(updateUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUpload);

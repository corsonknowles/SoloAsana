import { connect } from 'react-redux';
import { createProject, updateProject, fetchProject, fetchProjects, destroyProject, receiveErrors, clearErrors } from '../../actions/projects_actions';
import Projects from './projects';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: (teamID) => dispatch(fetchProjects(teamID)),
  fetchProject: (id) => dispatch(fetchProject(id)),
  createProject: (project) => dispatch(createProject(project)),
  updateProject: (project) => dispatch(updateProject(project)),
  destroyProject: (id) => dispatch(destroyProject(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects))

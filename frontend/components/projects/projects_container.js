import { connect } from 'react-redux';
import { createProject, updateProject, fetchProject, fetchProjects, destroyProject, receiveErrors, clearErrors } from '../../actions/projects_actions';
import Projects from './projects';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  projects: state.projects,
  state
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: (teamID) => dispatch(fetchProjects(teamID)),
  fetchProject: (id) => dispatch(fetchProject(id)),
  createProject: (project) => dispatch(createProject(project)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);

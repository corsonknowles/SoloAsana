import { connect } from 'react-redux';
import { createProject,
  updateProject,
  fetchProject,
  fetchProjects,
  destroyProject,
  receiveErrors,
  clearErrors
  } from '../../actions/projects_actions';
import Projects from './projects';
import { withRouter } from 'react-router';
import { createTask } from '../../actions/tasks_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  projects: state.projects,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  createProject: (project) => dispatch(createProject(project)),
  createTask: (task) => dispatch(createTask(task))
  destroyProject: (id) => dispatch(destroyProject(id)),
  fetchProject: (id) => dispatch(fetchProject(id)),
  fetchProjects: (teamID) => dispatch(fetchProjects(teamID)),
  updateProject: (project) => dispatch(updateProject(project)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects))

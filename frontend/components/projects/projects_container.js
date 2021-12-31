import { connect } from 'react-redux';
import {
  createProject,
  destroyProject,
  fetchProjects,
  updateProject
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
  createTask: (task) => dispatch(createTask(task)),
  createProject: (project) => dispatch(createProject(project)),
  destroyProject: (id) => dispatch(destroyProject(id)),
  fetchProjects: () => dispatch(fetchProjects()),
  updateProject: (project) => dispatch(updateProject(project))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects));

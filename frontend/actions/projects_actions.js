import * as PROJECTS from '../util/projects_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_TASKS = 'CLEAR_TASKS';

// synchronous actions
export const clearTasks = () => ({
  type: CLEAR_TASKS
})

export const deleteProject = id => ({
  type: DELETE_PROJECT,
  id
});

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

export const receiveProjects = projects => ({
  type: RECEIVE_PROJECTS,
  projects
});

// asynchronous actions
export const createProject = project => dispatch => (
  PROJECTS.createProject(project).then(savedProject => {
    dispatch(receiveProject(savedProject));
    return savedProject;
  })
);

export const destroyProject = id => dispatch => {
  return PROJECTS.deleteProject(id)
    .then( () => dispatch(deleteProject(id)) )
    .then( () => dispatch(clearTasks()));
};

export const fetchProjects = () => dispatch => (
  PROJECTS.fetchProjects().then(projects => {
    dispatch(receiveProjects(projects));
    return projects;
  })
);

export const updateProject = project => dispatch => {
  return PROJECTS.updateProject(project).then(
    currentProject => dispatch(receiveProject(currentProject))
  );
};

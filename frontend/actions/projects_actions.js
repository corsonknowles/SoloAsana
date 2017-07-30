import * as PROJECTS from '../util/projects_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_TASKS = 'CLEAR_TASKS';

// sync actions
export const receiveProjects = projects => ({
  type: RECEIVE_PROJECTS,
  projects
});

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

export const deleteProject = id => ({
  type: DELETE_PROJECT,
  id
});

export const clearTasks = () => ({
  type: CLEAR_TASKS
})

// async actions
export const createProject = project => dispatch => (
  PROJECTS.createProject(project)
    .then(savedProject => { dispatch(receiveProject(savedProject)) }
  )
);

export const fetchProjects = () => dispatch => (
  PROJECTS.fetchProjects()
    .then(projects => dispatch(receiveProjects(projects))
  )
);

export const fetchProjectsByTeam = teamID => dispatch => (
  PROJECTS.fetchProjects(teamID)
    .then(projects => dispatch(receiveProjects(projects))
  )
);

export const fetchProject = id => dispatch => (
  PROJECTS.fetchProject(id)
    .then(project => dispatch(receiveProject(project))
  )
);

export const updateProject = project => dispatch => {
  return PROJECTS.updateProject(project).then(
    currentProject => dispatch(receiveProject(currentProject))
  );
};

export const destroyProject = id => dispatch => {
  return PROJECTS.deleteProject(id)
    .then( () => dispatch(deleteProject(id)) )
    .then( () => dispatch(clearTasks()));
};

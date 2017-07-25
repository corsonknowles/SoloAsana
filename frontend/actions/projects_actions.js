import * as PROJECTS from '../util/projects_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';


// sync actions
export const receiveProjects = projects => ({
  type: RECEIVE_PROJECTS,
  projects
});

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

// async actions
export const createProject = project => dispatch => (
  PROJECTS.createProject(project)
    .then(savedProject => { dispatch(receiveProject(savedProject)) }
  )
);

export const fetchProjects = teamID => dispatch => (
  PROJECTS.fetchProjects(teamID)
    .then(projects => dispatch(receiveProjects(projects))
  )
);

export const fetchProject = id => dispatch => (
  PROJECTS.fetchProject(id)
    .then(project => dispatch(receiveProject(project))
  )
);

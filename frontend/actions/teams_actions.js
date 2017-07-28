import * as TEAMS from '../util/teams_api_util';

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const DELETE_TEAM = 'DELETE_TEAM';
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const RECEIVE_TEAM_BY_PROJECT = "RECEIVE_TEAM_BY_PROJECT";

// sync actions
export const receiveTeams = teams => ({
  type: RECEIVE_TEAMS,
  teams
});

export const receiveTeam = team => ({
  type: RECEIVE_TEAM,
  team
});

export const receiveTeamsByProject = project => ({
  type: RECEIVE_TEAM_BY_PROJECT,
  project
})

export const deleteTeam = id => ({
  type: DELETE_TEAM,
  id
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

// async actions

export const createTeam = team => dispatch => (
  TEAMS.createTeam(team)
    .then(newTeam => {
      dispatch(receiveTeam(newTeam));
      return newTeam;
    }, error => dispatch(receiveErrors(error.responseJSON))
  )
);

export const updateTeam = team => dispatch => {
  return TEAMS.updateTeam(team)
    .then(returnTeam => {
      dispatch(receiveTeam(returnTeam));
      return returnTeam;
    }, error => dispatch(receiveErrors(error.responseJSON))
  );
};

export const fetchTeams = projectID => dispatch => {
  return TEAMS.fetchTeams(projectID)
    .then(teams => dispatch(receiveTeams(teams))
  )
};

export const fetchTeam = id => dispatch => {
  return TEAMS.fetchTeam(id)
    .then(team => dispatch(receiveTeam(team))
  )
};

export const fetchTeamsByProject = projectID => dispatch => {
  return TEAMS.fetchTeamsByProject(projectID)
    .then(teams => dispatch(receiveTeamsByProject(teams))
  )
};

export const destroyTeam = id => dispatch => {
  return TEAMS.deleteTeam(id)
    .then( () => dispatch(deleteTeam(id)) );
};

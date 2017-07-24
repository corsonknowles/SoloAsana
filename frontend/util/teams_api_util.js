// createTeam: makes an AJAX request that creates a new team
export const createTeam = team => {
  return $.ajax({
    method: 'POST',
    url: `api/teams`,
    data: { team }
  });
};

export const fetchTeams = () => {
  return $.ajax({
    method: 'GET',
    url: `api/teams`
  });
};

export const fetchTeam = id => {
  return $.ajax({
    method: 'GET',
    url: `api/teams/${id}`
  });
};

//  TODO decide whether or not to make a many-to-many relationship with a join table
// export const joinTeam = (user, teamID) => {
//   return $.ajax({
//     method: 'POST',
//     url: `api/`,
//     data: { }
//   });
// };

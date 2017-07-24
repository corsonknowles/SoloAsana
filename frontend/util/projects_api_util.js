export const createProject = project => {
  return $.ajax({
    method: 'POST',
    url: `api/projects`,
    data: { project }
  });
};

// singular
export const fetchProject = projectID => (
  $.ajax({
    method: 'GET',
    url: `api/projects/${projectID}`
  })
);

// plural
export const fetchProjects = teamID => (
  $.ajax({
    method: 'GET',
    url: `api/teams/${teamID}/projects`
  })
);

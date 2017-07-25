export const createProject = project => {
  return $.ajax({
    method: 'POST',
    url: `api/projects`,
    data: { project }
  });
};

// update: makes an AJAX request that updates an existing user.
export const updateProject = project => (
  $.ajax({
    method: 'PATCH',
    url: `/api/projects/${project.id}`,
    data: { project }
  })
);

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

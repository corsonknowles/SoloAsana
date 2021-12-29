export const createProject = project => {
  return $.ajax({
    method: 'POST',
    url: `api/projects`,
    data: { project }
  });
};

// deleteProject: makes an AJAX request that deletes a project by ID
export const deleteProject = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/projects/${id}`
  });
};

// plural
export const fetchProjects = () => (
  $.ajax({
    method: 'GET',
    url: `api/projects`
  })
);

// update: makes an AJAX request that updates an existing project.
export const updateProject = project => (
  $.ajax({
    method: 'PATCH',
    url: `/api/projects/${project.id}`,
    data: { project }
  })
);

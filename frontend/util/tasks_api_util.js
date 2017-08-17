// createTask: makes an AJAX request that creates a new task
export const createTask = task => {
  return $.ajax({
    method: 'POST',
    url: `api/tasks`,
    data: { task }
  });
};

// plural
export const fetchTasks = projectID => {
  return $.ajax({
    method: 'GET',
    url: `api/tasks/`,
    data: { id: projectID }
  });
};

export const fetchTasksByProject = projectID => {
  return $.ajax({
    method: 'GET',
    url: `api/projects/${projectID}`
  });
};

// updateTask: makes an AJAX request that updates a task (takes Task not task.id as argument)
export const updateTask = task => {
  return $.ajax({
    method: 'PATCH',
    url: `api/tasks/${task.id}`,
    data: { task }
  });
};

// deleteTask: makes an AJAX request that deletes a task by ID
export const deleteTask = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/tasks/${id}`
  });
};

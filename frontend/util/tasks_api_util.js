import { request } from './api_util';

export const fetchTasksByProject = projectID => request('GET',    `/api/projects/${projectID}`);
export const createTask          = task      => request('POST',   '/api/tasks',          { task });
export const updateTask          = task      => request('PATCH',  `/api/tasks/${task.id}`, { task });
export const deleteTask          = id        => request('DELETE', `/api/tasks/${id}`);

import { request } from './api_util';

export const fetchProjects  = ()        => request('GET',    '/api/projects');
export const createProject  = project  => request('POST',   '/api/projects',         { project });
export const updateProject  = project  => request('PATCH',  `/api/projects/${project.id}`, { project });
export const deleteProject  = id       => request('DELETE', `/api/projects/${id}`);

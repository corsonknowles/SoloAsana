import { request } from './api_util';

export const login  = user => request('POST',   '/api/session',       { user });
export const logout = ()   => request('DELETE',  '/api/session');
export const signup = user => request('POST',   '/api/users',         { user });
export const update = user => request('PATCH',  `/api/users/${user.id}`, { user });

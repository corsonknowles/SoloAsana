// signup: makes an AJAX request that creates a new user.
export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

// update: makes an AJAX request that updates an existing user.
export const update = user => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  })
);

// login: should make an AJAX request that creates a new session.
export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

// logout: should make an AJAX request that deletes the current session.
export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

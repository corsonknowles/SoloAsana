const csrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.content : '';
};

// Thin wrapper around fetch that handles JSON serialization, CSRF headers,
// and converts HTTP error responses into rejected Promises with parsed JSON.
export const request = (method, url, body) => {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken()
    },
    credentials: 'same-origin'
  };
  if (body !== undefined) opts.body = JSON.stringify(body);
  return fetch(url, opts).then(res =>
    res.ok ? res.json() : res.json().then(err => Promise.reject(err))
  );
};

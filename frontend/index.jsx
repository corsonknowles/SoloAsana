import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js'
import Root from './components/root'

// testing
import { login, signup, logout } from './util/session_api_util'


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch; // just for testing!

// testing
  window.login = login;
  window.signup = signup;
  window.logout = logout;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});

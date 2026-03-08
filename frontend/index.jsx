import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import configureStore from './store/store.js'
import Root from './components/root'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  const root = document.getElementById('root');
  Modal.setAppElement(root);
  createRoot(root).render(<Root store={store} />);
});

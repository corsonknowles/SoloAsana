import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={ store } >
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;

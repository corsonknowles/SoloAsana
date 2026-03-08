import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/root_reducer';

// RTK's configureStore automatically enables Redux DevTools and includes
// redux-thunk middleware, replacing the explicit composeWithDevTools setup.
export default (preloadedState = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });

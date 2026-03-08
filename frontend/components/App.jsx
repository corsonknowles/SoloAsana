import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SessionForm from './session_form/session_form_container';
import { Routes, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <Routes>
    <Route path="/login" element={<AuthRoute><SessionForm /></AuthRoute>} />
    <Route path="/projects/:id" element={<ProtectedRoute><GreetingContainer /></ProtectedRoute>} />
    <Route path="/*" element={<ProtectedRoute><GreetingContainer /></ProtectedRoute>} />
  </Routes>
);

export default App;

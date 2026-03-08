import React from 'react';
import { Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Auth guard: redirect logged-in users away from the login page.
export const AuthRoute = ({ children }) => {
  const loggedIn = useSelector(state => Boolean(state.session.currentUser));
  return loggedIn ? <Navigate to="/" replace /> : children;
};

// Protected guard: redirect anonymous users to login.
export const ProtectedRoute = ({ children }) => {
  const loggedIn = useSelector(state => Boolean(state.session.currentUser));
  return loggedIn ? children : <Navigate to="/login" replace />;
};

// HOC for class components that need router props.
// withRouter was removed in React Router v6; this replacement injects
// { match: { params }, navigate, location } to preserve the existing
// this.props.match.params.id usage in class components without converting them.
export const withRouter = (Component) => {
  const WrappedComponent = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} match={{ params }} navigate={navigate} location={location} />;
  };
  WrappedComponent.displayName =
    `withRouter(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

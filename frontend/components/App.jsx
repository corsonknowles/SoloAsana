import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import TaskContainer from './tasks/task_container';
import SessionForm from './session_form/session_form_container';
import { Route, Switch } from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route_util';


const App = ({currentUser}) => {
  return (
    <Switch>
      <AuthRoute path="/login" component={SessionForm} />
      <ProtectedRoute path="/projects/:id" component={TaskContainer} />
      <ProtectedRoute path="/" component={GreetingContainer} />
    </Switch>

  );
};

export default App;

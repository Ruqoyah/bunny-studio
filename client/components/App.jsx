import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/Index';
import Login from './authentication/Login';
import Users from './users/Index';
import Tasks from './tasks/Index';
import Authenticate from './middleware/Authenticate'

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={(Homepage)} />
            <Route exact path="/login" component={(Login)} />
            <Route exact path="/users" component={Authenticate(Users)} />
            <Route exact path="/users/:userId/tasks" component={Authenticate(Tasks)} />
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;

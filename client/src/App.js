import React, { Component } from 'react';
import './App.scss';
import LoginPage from './Components/Admin/Pages/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customer from './Components/Customer/Customer';
import Admin from './Components/Admin/Admin';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={LoginPage}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Route path='/' component={Customer}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

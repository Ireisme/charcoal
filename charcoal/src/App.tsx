import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import './App.css';

import history from './history';

import Home from './home/Home';
import Landing from './home/Landing';
import Callback from './auth/Callback';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/home" component={Home} />
          <Route path="/callback" component={Callback} />
          <Route exact path="/" render={(props) => <Landing {...props}/>} />
        </div>
      </Router>
    );
  }
}

export default App;

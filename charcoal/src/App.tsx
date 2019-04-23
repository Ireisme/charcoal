import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Home from './home/Home';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;

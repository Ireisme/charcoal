import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SiteList from './SiteList';

class Sites extends Component {
  render() {
    return (
      <div>
        <div>This is the sites base page</div>
        <Router>
          <div>
            <Route path="/home/sites/list" component={SiteList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Sites;
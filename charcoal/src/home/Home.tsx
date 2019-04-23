import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sites from '../sites/Sites';
import { toggleDrawer } from './store/actions';
import { connect } from 'react-redux';
import { AppState } from '../store';
import Header from './Header';
import Sidebar from './Sidebar';
import { getDrawerOpen } from './store/selectors';

export class Home extends Component<Props> {
  render() {
    return (
      <div>
        <Header onMenuClick={this.props.toggleSidebar} />
        <Sidebar onSidebarClose={this.props.toggleSidebar} drawerOpen={this.props.drawerOpen} />
        <Router>
          <div>
            <Route path="/home/sites" component={Sites} />
          </div>
        </Router>
      </div >
    );
  }
}

interface StateProps {
  drawerOpen: boolean;
}

interface DispatchProps {
  toggleSidebar: () => void
}

type Props = StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, {}, AppState>(
  (state: AppState) => ({ drawerOpen: getDrawerOpen(state)}),
  { toggleSidebar: toggleDrawer}
)(Home);

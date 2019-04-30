import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sites from '../sites/pages/Sites';
import { toggleDrawer } from './store/actions';
import { connect } from 'react-redux';
import { AppState } from '../store';
import Header from './Header';
import Sidebar from './Sidebar';
import { getDrawerOpen } from './store/selectors';
import { getAllSites } from '../sites/store/thunks';

export class Home extends Component<Props> {
  componentDidMount() {
    this.props.getAllSites();
  }  

  render() {
    return (
      <div>
        <Header />
        <Sidebar onSidebarClose={this.props.toggleSidebar} drawerOpen={this.props.drawerOpen} />

        <Route path="/home/sites" component={Sites} />
      </div >
    );
  }
}

interface StateProps {
  drawerOpen: boolean;
}

interface DispatchProps {
  toggleSidebar: () => void,
  getAllSites: () => void
}

type Props = StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, {}, AppState>(
  (state: AppState) => ({ drawerOpen: getDrawerOpen(state) }),
  { 
    toggleSidebar: toggleDrawer,
    getAllSites: getAllSites
  }
)(Home);

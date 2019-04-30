import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { logout } from '../auth/store/thunks';
import { toggleDrawer } from './store/actions';

const styles = {
  flex: {
    flexGrow: 1
  }
};

export class Header extends Component<Props> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.props.onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={styles.flex} align="center">
            charcoal
            </Typography>
          <Button color="inherit" onClick={this.props.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

interface DispatchProps {
  onMenuClick: () => void;
  logout: () => void;
}

type Props = DispatchProps;

export default connect<{}, DispatchProps, {}, AppState>(
  null,
  { 
    onMenuClick: toggleDrawer,
    logout: logout
  }
)(Header);
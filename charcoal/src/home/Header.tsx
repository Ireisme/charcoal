import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';

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
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

interface Props {
  onMenuClick: () => void
}

export default Header;

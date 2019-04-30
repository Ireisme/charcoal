import React, { Component } from 'react';
import PlaceIcon from '@material-ui/icons/Place';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'

export class Sidebar extends Component<Props> {
  render() {
    return (
      <Drawer open={this.props.drawerOpen} onClose={this.props.onSidebarClose}>
        <List>
          <ListItem button {...{component: Link, to: '/home/sites/list'} as any}>
            <ListItemIcon><PlaceIcon /></ListItemIcon>
            <ListItemText  primary="Sites" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

interface Props {
  drawerOpen: boolean,
  onSidebarClose: () => void
}

export default Sidebar;

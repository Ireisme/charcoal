import React, { Component } from 'react';

import { Site } from '../site';
import { Guid } from 'guid-typescript';
import GridSiteList from '../components/GridSiteList';
import { Grid } from '@material-ui/core';
import { AppState } from '../../store';
import { getAllSites } from '../store/selectors';
import { connect } from 'react-redux';

const classes = {
  root: {
    marginTop: 10
  }
};

class Sites extends Component<Props> {
  render() {
    return (
      <div style={classes.root}>
        <Grid container justify="center">
          <Grid item sm={9} lg={6}>
            <GridSiteList sites={this.props.sites} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

interface StateProps {
  sites: Site[];
}

type Props = StateProps;

export default connect<StateProps, {}, {}, AppState>(
  (state: AppState) => ({ sites: getAllSites(state) })
)(Sites);
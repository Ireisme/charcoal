import React, { Component, ReactNode } from 'react';
import { Site } from '../site';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { Link } from 'react-router-dom';

class GridSiteList extends Component<Props> {
  render() {
    const sites = this.props.sites;
    return (
      <div>
        <GridList cellHeight={300}>
          {sites.map(site => (
            <GridListTile key={site.ID.toString()} {...{ component: Link, to: `/home/sites/${site.ID.toString()}` } as any}>
              <img src={site.ImageURL} alt={site.Name} />
              <GridListTileBar
                title={site.Name}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

interface Props {
  sites: Site[]
}

export default GridSiteList;
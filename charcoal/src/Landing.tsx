import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const HomeLink = (props: any) => <Link to="/home" {...props} />

class Landing extends Component {
  render() {
    const backgroundStyle = {
      position: 'fixed' as 'fixed',
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/6/6f/%C3%87atalh%C3%B6y%C3%BCk_after_the_first_excavations_by_James_Mellaart_and_his_team..jpg)',
      backgroundSize: 'cover',
      height: '100%',
      width: '100%'
    };

    return (
      <div>
        <div style={backgroundStyle} >
          <Grid container justify="flex-end">
            <Grid item xs={1}>
              <Typography align="right" style={{ margin: "20px" }}>
                <Button variant="contained" color="primary" component={HomeLink}>Login</Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <h1 className="" style={{ marginTop: '200px' }}>charcoal</h1>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Landing;

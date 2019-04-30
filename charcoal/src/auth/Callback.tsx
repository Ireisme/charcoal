import React, { Component } from 'react';
import loading from './loading.svg';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { decodeHash } from './store/thunks';
import { RouteComponentProps } from 'react-router';

export class Callback extends Component<Props> {

  componentDidMount() {
    const { location, history } = this.props;
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.decodeHash().then(() => {
        history.push('/home');
      });
    }
  }

  render() {
    const style = {
      position: 'absolute' as 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

interface DispatchProps {
  decodeHash: () => any;
}

type Props = DispatchProps & RouteComponentProps;

export default connect<{}, DispatchProps, {}, AppState>(
  null,
  { decodeHash: decodeHash }
)(Callback);

import React, { Component } from 'react';
import loading from './loading.svg';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { RouteComponentProps } from 'react-router';
import Auth from './auth';
import { loginFailure, loginSuccess } from './store/requests';
import { AuthSession } from './store/state';

export class Callback extends Component<Props> {

  componentDidMount() {
    const { location, history } = this.props;
    if (/access_token|id_token|error/.test(location.hash)) {
      const auth = new Auth();
      auth.decodeHash().then(
        session => {
          this.props.hashDecoded(session);
          history.push('/home');
        },
        error => {
          this.props.hashDecodingFailure(error);
          history.push('/landing');
        }
      );
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
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

interface DispatchProps {
  hashDecoded: (session: AuthSession) => any;
  hashDecodingFailure: (error: Error) => any;
}

type Props = DispatchProps & RouteComponentProps;

export default connect<{}, DispatchProps, {}, AppState>(
  null,
  {
    hashDecoded: loginSuccess,
    hashDecodingFailure: loginFailure
  }
)(Callback);

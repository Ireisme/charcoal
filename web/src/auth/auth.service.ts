import auth0 from 'auth0-js';
import { EventEmitter } from 'events';
import authConfig from '../../auth_config';

import store from '../store/store'

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  audience: 'charcoal.io',
  responseType: 'id_token',
  scope: 'openid profile email'
});

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

export class AuthService extends EventEmitter {
  private idToken: string;
  private profile: any;
  private tokenExpiry: Date;

  login() {
    webAuth.authorize({
      responseType: 'token id_token'
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err || !authResult) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  localLogin(authResult: auth0.Auth0DecodedHash) {
    store.commit({ type: 'setAccessToken', accessToken: authResult.accessToken });

    this.idToken = authResult.idToken || '';
    this.profile = authResult.idTokenPayload;

    this.tokenExpiry = new Date(this.profile.exp * 1000);

    localStorage.setItem(localStorageKey, 'true');

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== "true") {
        return reject("Not logged in");
      }
      
      webAuth.checkSession({
        responseType: 'token id_token'
      }, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);

    this.idToken = '';
    this.tokenExpiry = new Date();
    this.profile = null;

    webAuth.logout({
      returnTo: 'http://localhost:8080'
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  isAuthenticated() {
    return (
      Date.now() < this.tokenExpiry.getDate() &&
      localStorage.getItem(localStorageKey) === 'true'
    );
  }
}

const instance = new AuthService();

export default instance;
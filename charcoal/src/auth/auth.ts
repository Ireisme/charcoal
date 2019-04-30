import history from '../history';
import auth0, { Auth0DecodedHash } from 'auth0-js';
import { AUTH_CONFIG } from './auth-config';
import { AuthSession } from './store/state';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: 'charcoal.io',
    responseType: 'id_token',
    scope: 'openid profile email'
  });

  login = () => {
    this.auth0.authorize({
      responseType: 'token id_token'
    });
  };

  decodeHash = (): Promise<AuthSession> => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(this.toAuthSession(authResult));
        } else if (err) {
          reject(err.error);
        }
      });
    });
  };

  renewSession = (): Promise<AuthSession> => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(this.toAuthSession(authResult));
        } else if (err) {
          this.logout();
          reject(err.error);
        }
     });
    });
  };

  logout = () => {
    this.auth0.logout({
      returnTo: window.location.origin
    });
  };

  toAuthSession = (authResult: Auth0DecodedHash): AuthSession => {
    const expiresAt = authResult.expiresIn ? (authResult.expiresIn * 1000) + new Date().getTime() : 0;
    return {
      idToken: authResult.idToken || '',
      accessToken: authResult.accessToken || '',
      expiresAt: expiresAt
    }
  };
}
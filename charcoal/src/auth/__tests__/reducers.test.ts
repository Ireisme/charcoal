import { AuthState } from "../store/state";
import { authReducer } from "../store/reducers";
import { LoginSuccess, RenewSuccess, RENEW_SUCCESS, LOGIN_SUCCESS, LogoutRequest, LOGOUT_REQUEST } from "../store/requests";

describe('authReducer', () => {
  it('should set session on LOGIN_SUCCESS', () => {
    const state: AuthState = {
      session: null
    };
    const session = {
      accessToken: 'accessToken',
      idToken: 'idToken',
      expiresAt: 12345
    };
    const action: LoginSuccess = {
      session: session,
      type: LOGIN_SUCCESS
    };

    const returned = authReducer(state, action);

    expect(returned.session).toBe(session);
  });

  it('should set session on RENEW_SUCCESS', () => {
    const state: AuthState = {
      session: null
    };
    const session = {
      accessToken: 'accessToken',
      idToken: 'idToken',
      expiresAt: 12345
    };
    const action: RenewSuccess = {
      session: session,
      type: RENEW_SUCCESS
    };

    const returned = authReducer(state, action);

    expect(returned.session).toBe(session);
  });

  it('should clear session on LOGOUT_REQUEST', () => {
    const state: AuthState = {
      session: {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresAt: 12345
      }
    };
    const action: LogoutRequest = {
      type: LOGOUT_REQUEST
    };

    const returned = authReducer(state, action);

    expect(returned.session).toBeNull();
  });
})
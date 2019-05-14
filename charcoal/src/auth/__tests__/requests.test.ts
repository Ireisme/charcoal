import { LoginRequest, LOGIN_REQUEST, loginRequest, RenewRequest, renewRequest, RENEW_REQUEST, LoginSuccess, LOGIN_SUCCESS, loginSuccess, RenewSuccess, RENEW_SUCCESS, renewSuccess, loginFailure, LoginFailure, LOGIN_FAILURE, RenewFailure, RENEW_FAILURE, renewFailure, LOGOUT_REQUEST, LogoutRequest, logoutRequest } from "../store/requests";

describe('authRequests', () => {
  describe('login', () => {
    it('should return the correct object from loginRequest', () => {
      const expected: LoginRequest = {
        type: LOGIN_REQUEST
      };

      const returned = loginRequest();

      expect(returned).toEqual(expected);
    });

    it('should return the correct object from loginSuccess', () => {
      const session = {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresAt: 12345
      };
      const expected: LoginSuccess = {
        session: session,
        type: LOGIN_SUCCESS
      };

      const returned = loginSuccess(session);

      expect(returned).toEqual(expected);
    });

    it('should return the correct object from loginFailure', () => {
      const error: Error = {
        name: 'serious error',
        message: 'something went wrong'
      };
      const expected: LoginFailure = {
        error: error,
        type: LOGIN_FAILURE
      };

      const returned = loginFailure(error);

      expect(returned).toEqual(expected);
    });
  });

  describe('renew ', () => {
    it('should return the correct object from renewRequest', () => {
      const expected: RenewRequest = {
        type: RENEW_REQUEST
      };

      const returned = renewRequest();

      expect(returned).toEqual(expected);
    });

    it('should return the correct object from renewSuccess', () => {
      const session = {
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresAt: 12345
      };
      const expected: RenewSuccess = {
        session: session,
        type: RENEW_SUCCESS
      };

      const returned = renewSuccess(session);

      expect(returned).toEqual(expected);
    });

    it('should return the correct object from renewFailure', () => {
      const error: Error = {
        name: 'serious error',
        message: 'something went wrong'
      };
      const expected: RenewFailure = {
        error: error,
        type: RENEW_FAILURE
      };

      const returned = renewFailure(error);

      expect(returned).toEqual(expected);
    });
  });

  describe('logout ', () => {
    it('should return the correct object from logoutRequest', () => {
      const expected: LogoutRequest = {
        type: LOGOUT_REQUEST
      };

      const returned = logoutRequest();

      expect(returned).toEqual(expected);
    });
  });
});